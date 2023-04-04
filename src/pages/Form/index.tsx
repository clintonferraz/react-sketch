import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  nome: string;
  email: string;
}

export default function Formulario() {
  const {register, handleSubmit, formState: { errors }} = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Adicione aqui a lógica para enviar os dados do formulário
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nome:
        <input type="text" {...register("nome", { required: true })} />
        {errors.nome && <span>Nome é obrigatório</span>}
      </label>
      <label>
        Email:
        <input
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <span>Email inválido</span>}
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}