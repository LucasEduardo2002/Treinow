// DTO (Data Transfer Object) para criar um novo treino
// Este objeto é usado para validar os dados recebidos na requisição para criar um treino.
// Contém as propriedades necessárias para a criação de um treino.
export class CreateWorkoutDto {
  // Nome do treino (ex: "Musculação do Peito")
  name: string;
  
  // Duração do treino em minutos (ex: 60)
  duration: number;
}
