import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { mask, unMask } from 'remask'

type FormData = {
    name: string,
    cpf: string,
    email: string,
    phone: string
}

export default function Form() {
    const [formFields, setFormFields] = useState<FormData>({
        name: '',
        cpf: '',
        email: '',
        phone: '',
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const modifiedData = {
          ...data,
          phone: unMask(data.phone),
          cpf: unMask(data.cpf)
        };
      
        console.log(modifiedData);
    };

    const applyMask = (eventTarget: HTMLInputElement) => {
        const { id, value } = eventTarget;
        let maskedValue = value;

        switch (id) {
            case 'cpf':
                maskedValue = mask(unMask(value), ['999.999.999-99']);
                break;
            case 'phone':
                maskedValue = mask(unMask(value), ['(99) 9999-9999', '(99) 9 9999-9999']);
                break;
            
        }
        setFormFields((prevFields) => ({
            ...prevFields,
            [id]: maskedValue,
          }));

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
                                <input type="text"
                                    className="form-control"
                                    id="name"
                                    value={formFields.name}
                                    placeholder="Digite o Nome"
                                    {...register('name', { required: true, onChange: (event) => applyMask(event.target) })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cpf" className="form-label">CPF:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cpf"
                                    placeholder="Digite o CPF"
                                    value={formFields.cpf}
                                    {...register('cpf', { onChange: (event) => applyMask(event.target) })}
                                />
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
                                <label htmlFor="phone" className="form-label">Telefone:</label>
                                <input
                                    className="form-control"
                                    id="phone"
                                    placeholder="(00) 0000-0000"
                                    value={formFields.phone}
                                    {...register('phone', { onChange: (event) => applyMask(event.target) })}
                                />
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
