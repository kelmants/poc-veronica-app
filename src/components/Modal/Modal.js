import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Modal.css';

export default function ModalView(props) {
    const [dataForm, setDataForm] = React.useState({});

    const handleSubmit = event => {
        event.preventDefault();
        props.onSubmit(dataForm, () => setDataForm({}))
    }

    const handleOnChange = ({ target }) => setDataForm(prev => ({ ...prev, [target.name]: target.value }))

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" value={dataForm?.name || ''} name="name" className="form-control" onChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Empresa</label>
                        <input type="text" value={dataForm?.company || ''} name="company" className="form-control" onChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Fecha</label>
                        <input type="date" value={dataForm?.date || ''} name="date" className="form-control" onChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text" value={dataForm?.status || ''} name="status" className="form-control" onChange={handleOnChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="percentaje">Porcentaje</label>
                        <input type="number" value={dataForm?.percentaje || ''} name="percentaje" className="form-control" onChange={handleOnChange} />
                    </div>
                    <select name="template" onChange={handleOnChange} value={dataForm.template} className="form-group custom-select">
                        <option selected>Selecciona un template</option>
                        <option value="sofia">Sofia</option>
                        <option value="aurora">Aurora </option>
                    </select>
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </Modal.Body>
        </Modal >

    );
}