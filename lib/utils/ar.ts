export interface ARDetection {
  faceDetected: boolean;
  poseDetected: boolean;
  handDetected: boolean;
  confidence: number;
}

export function calculateDetectionConfidence(detections: {
  face?: boolean;
  pose?: boolean;
  hand?: boolean;
}): number {
  let confidence = 0;
  let total = 0;

  if (detections.face !== undefined) {
    confidence += detections.face ? 1 : 0;
    total++;
  }
  if (detections.pose !== undefined) {
    confidence += detections.pose ? 1 : 0;
    total++;
  }
  if (detections.hand !== undefined) {
    confidence += detections.hand ? 1 : 0;
    total++;
  }

  return total > 0 ? (confidence / total) * 100 : 0;
}

export function isARReady(detection: ARDetection, requiredConfidence: number = 50): boolean {
  return detection.confidence >= requiredConfidence;
}

export function getDetectionMessage(detection: ARDetection): string {
  if (!detection.faceDetected && !detection.poseDetected && !detection.handDetected) {
    return 'No detection. Please position yourself in frame.';
  }

  const detectedParts = [];
  if (detection.faceDetected) detectedParts.push('face');
  if (detection.poseDetected) detectedParts.push('body');
  if (detection.handDetected) detectedParts.push('hands');

  return `Detecting: ${detectedParts.join(', ')} (${Math.round(detection.confidence)}%)`;
}
