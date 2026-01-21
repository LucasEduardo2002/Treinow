export class CreateUserDto {
  name: string;
  email: string;
  document: string;
  type: 'PERSONAL' | 'STUDENT'; 
  password: string;
}