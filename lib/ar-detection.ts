import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import * as posenet from '@tensorflow-models/posenet';
import * as handpose from '@tensorflow-models/handpose';

export type DetectionType = 'face' | 'pose' | 'hand';

export interface FaceDetection {
  type: 'face';
  landmarks: number[][];
  boundingBox: { x: number; y: number; width: number; height: number };
}

export interface PoseDetection {
  type: 'pose';
  keypoints: Array<{ position: { x: number; y: number }; score: number }>;
}

export interface HandDetection {
  type: 'hand';
  landmarks: number[][];
  handedness: string;
}

export type Detection = FaceDetection | PoseDetection | HandDetection;

let facemeshModel: facemesh.FaceMesh | null = null;
let posenetModel: posenet.PoseNet | null = null;
let handposeModel: handpose.HandPose | null = null;

export async function initModels() {
  try {
    await tf.ready();
    console.log('[v0] Loading TensorFlow models...');
    
    facemeshModel = await facemesh.load();
    posenetModel = await posenet.load();
    handposeModel = await handpose.load();
    
    console.log('[v0] All models loaded successfully');
  } catch (error) {
    console.error('[v0] Error loading models:', error);
  }
}

export async function detectFace(video: HTMLVideoElement): Promise<FaceDetection | null> {
  if (!facemeshModel) return null;

  try {
    const predictions = await facemeshModel.estimateFaces(video, false);
    
    if (predictions.length === 0) return null;

    const face = predictions[0];
    const landmarks = face.scaledMesh as number[][];
    
    // Calculate bounding box
    const xs = landmarks.map(l => l[0]);
    const ys = landmarks.map(l => l[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      type: 'face',
      landmarks,
      boundingBox: {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      },
    };
  } catch (error) {
    console.error('[v0] Error detecting face:', error);
    return null;
  }
}

export async function detectPose(video: HTMLVideoElement): Promise<PoseDetection | null> {
  if (!posenetModel) return null;

  try {
    const pose = await posenetModel.estimateSinglePose(video, {
      flipHorizontal: true,
    });

    if (!pose || !pose.keypoints) return null;

    return {
      type: 'pose',
      keypoints: pose.keypoints,
    };
  } catch (error) {
    console.error('[v0] Error detecting pose:', error);
    return null;
  }
}

export async function detectHand(video: HTMLVideoElement): Promise<HandDetection | null> {
  if (!handposeModel) return null;

  try {
    const predictions = await handposeModel.estimateHands(video, true);
    
    if (predictions.length === 0) return null;

    const hand = predictions[0];
    const landmarks = hand.landmarks as number[][];

    return {
      type: 'hand',
      landmarks,
      handedness: hand.handInViewConfidence > 0.5 ? 'visible' : 'hidden',
    };
  } catch (error) {
    console.error('[v0] Error detecting hand:', error);
    return null;
  }
}

export async function detectAll(
  video: HTMLVideoElement
): Promise<{ face: FaceDetection | null; pose: PoseDetection | null; hand: HandDetection | null }> {
  const [face, pose, hand] = await Promise.all([
    detectFace(video),
    detectPose(video),
    detectHand(video),
  ]);

  return { face, pose, hand };
}

export function getFeatureAnchor(
  detection: Detection,
  featureType: string
): { x: number; y: number; scale: number } | null {
  if (detection.type === 'face') {
    // Key landmarks for face: 
    // 127, 356 = face contour points
    // 10 = top of head, 152 = chin
    const landmarks = detection.landmarks;
    const topHead = landmarks[10] || [0, 0];
    const chin = landmarks[152] || [0, 0];
    
    return {
      x: (landmarks[127]?.[0] + landmarks[356]?.[0]) / 2 || 0,
      y: (topHead[1] + chin[1]) / 2,
      scale: detection.boundingBox.width / 100,
    };
  }

  if (detection.type === 'pose') {
    const keypoints = detection.keypoints;
    const nose = keypoints.find(k => k.position)?.position;
    const leftShoulder = keypoints[5]?.position;
    const rightShoulder = keypoints[6]?.position;
    
    if (!nose) return null;

    if (featureType === 'clothing' && leftShoulder && rightShoulder) {
      return {
        x: (leftShoulder.x + rightShoulder.x) / 2,
        y: (leftShoulder.y + rightShoulder.y) / 2,
        scale: Math.abs(rightShoulder.x - leftShoulder.x) / 50,
      };
    }

    return {
      x: nose.x,
      y: nose.y,
      scale: 1,
    };
  }

  if (detection.type === 'hand') {
    const landmarks = detection.landmarks;
    const wrist = landmarks[0] || [0, 0];
    
    return {
      x: wrist[0],
      y: wrist[1],
      scale: 1,
    };
  }

  return null;
}
