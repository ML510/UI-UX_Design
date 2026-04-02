export class Candidate {
  id!: number;
  name!: string;
  location!: string;
  role!: string;
  experience!: number;
  aiScore!: number;
  humanScore!: number;
  status!: string;
  email!: string;
  avatar!: string;
  updatedAt!: Date;

  constructor(init?: Partial<Candidate>) {
    Object.assign(this, init);
  }
}