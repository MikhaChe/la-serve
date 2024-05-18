export class UpdateStatusDto {
  readonly chatID: string;
  readonly userID: string;
  readonly status: number;
  readonly reason: string;
}