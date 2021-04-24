export interface AddNewVersionData {
  datasetId: string;
  name: string;
  validationSplit: number;
  testSplit: number;
  augmentation: string;
  sampleRate: number;
  clipDuration: number;
}

export type Severity = ModalSeverity | undefined;

export enum ModalSeverity {
  ERORR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
}
