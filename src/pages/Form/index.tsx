import { useForm, SubmitHandler } from "react-hook-form";


type FormData = {
    name: string,
    cpf: string,
    email: string,
    phone: string
}

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);

    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 border p-4">
                    <h2 className="mb-3">My form</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Nome:</label>
                                <input type="text" className="form-control" id="name" {...register('name', { required: true })} placeholder="Digite o Nome" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpf" className="form-label">CPF:</label>
                                <input type="text" className="form-control" id="cpf" placeholder="Digite o CPF" {...register('cpf', { maxLength: 11 })} maxLength={11} minLength={11} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Digite o Endereço de email"
                                    {...register('email', {
                                        pattern:
                                        {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })} 
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                            <div className="form-group  mb-3">
                                <label htmlFor="age" className="form-label">Telefone:</label>
                                <input className="form-control" id="phone" placeholder="Digite o telefone" {...register('phone')} />
                            </div>
                            <div className="form-group d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
