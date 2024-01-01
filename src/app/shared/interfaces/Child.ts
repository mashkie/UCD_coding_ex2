import { Kindergarden } from './Kindergarden';

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  registeredDate: string;
  kindergardenId: number;
}

export interface ChildResponse {
  id: string;
  name: string;
  birthDate: string;
  registeredDate: string;
  kindergarden: Kindergarden;
  kindergardenId: number;
}
