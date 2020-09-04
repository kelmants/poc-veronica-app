import React, { useState, useEffect } from 'react'
import { formatDataHiringRoom } from '../../utils'
import { dataTable } from '../../Mocks'

export default function HiringRoom() {
    const [loading, setLoading] = useState(true);
    const [dataTab, setDataTab] = useState([])
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)  
            setDataTab(formatDataHiringRoom(dataTable.curriculums) )
        }, 4000)
    }, [])

    if(loading) {
        return (
            <h2>Cargando...</h2>
        )
    }

    const renderSkills = (user) => (
        user.tags.map(skill => {
            let color = skill.length > 5 ? 'blue' : 'green';
            return (
                <div style={{color: color}}> 
                    {skill?.nombre.toUpperCase()}
                </div>
            )
        })
    )


    return(
        <div>
            <h2 className="text-center" style={{padding: 40}}>Tabla de candidatos</h2>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Fecha de Nacimiento</th>
                        <th className="text-center" scope="col">Email</th>
                        <th className="text-center" scope="col">Conocimientos</th>
                        <th className="text-center" scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataTab?.map(user => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                                <td>{renderSkills(user)}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mr-2">
                                        <svg
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                            className="bi bi-pencil-square"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                            fillRule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}