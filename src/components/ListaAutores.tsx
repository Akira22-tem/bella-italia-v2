import React, { useRef, useState} from "react";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import './ListaAutores.css';
import kbg from './assets/logor.png';
        
interface Autor {
    id: number;
    nombre: string;
    apellido: string;


}

export const ListaAutores: React.FC=()=>{   
    const [autores, setAutoes] = useState<Autor[]>([
        { id: 1, nombre: "Alexis", apellido: "Morales" },
        { id: 2, nombre: "Kevin", apellido: "Yugla" } // Separación de objetos con coma
    ]);
    const [autor,setAutor]=useState<Autor>({
        id: 0, 
        nombre: ' ',
        apellido:' '
    });
    const [autorSel,setAutorSel]= useState<Autor|null>(null);
    const [mostrarDialogo,setMostrarDialogo]=useState<boolean>(false);
    const toast = useRef<Toast>(null);
    const [dialogoEliminar,setDialogoEliminar]=useState<boolean>(false);
    const guardar=()=>{
        if(autor.id===0){
            setAutoes([...autores,{...autor, id: autores.length + 1 }]);
            toast.current?.show({severity:'success', summary: 'Success', detail:'Autor Guardado Exitosamente', life: 3000});
        }else{
            
            setAutoes(autores.map(a=>(a.id===autor.id?autor:a)));
            toast.current?.show({severity:'success', summary: 'Success', detail:'Autor Actualizado Exitosamente', life: 3000});
        }
        setMostrarDialogo(false);
        setAutor({id: 0, nombre:'', apellido:''});


    }
    const confirmarEliminacion=(autor: Autor)=>{
        setAutorSel(autor);
        setDialogoEliminar(true);
    }
    const eliminarAutor=()=>{
        setAutoes(autores.filter(a=>a.id!==autorSel?.id));
        setDialogoEliminar(false);
        toast.current?.show({severity:'success', summary: 'Success', detail:'Autor Eliminado Exitosamente Prro', life: 3000});
    }
    const editarAutor=(autor:Autor)=>{
        setAutor(autor);
        setMostrarDialogo(true);

    }

    return(
        <div className="flex-content">
            <h1>Gestion de Autores</h1>
            <Toast ref={toast} />
            <Button label="Add" icon="pi pi-user-plus" onClick={() => setMostrarDialogo(true)} />
            <DataTable 
            value={autores} 
            selectionMode="single" 
            selection={autorSel} 
            onSelectionChange={(e) => setAutorSel(e?.data)}
            dataKey="id" 
            onRowSelect={(rowData) => editarAutor(rowData.data)} 
            onRowUnselect={() => setAutorSel(null)} 
            metaKeySelection={false} 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 15, 20]} 
            stripedRows 
            tableStyle={{ minWidth: '50rem' }}>

                <Column field="id" header="Id"></Column>
                <Column field="nombre" header="Nombres"></Column>
                <Column field="apellido" header="Apellidos"></Column>
                <Column
                    header="Acciones"
                    body={(rowData:Autor)=>(
                        <Button
                            label="Eliminar"
                            icon="pi pi-trash"
                            onClick={()=>confirmarEliminacion(rowData)}

                        />
                    )}
                />
            
            </DataTable>

            <Dialog header="Autor" 
                visible={mostrarDialogo} 
                
                onHide={() =>  setMostrarDialogo(false) }>
                <div className="p-field">
                    <label htmlFor="txtNombre">Nombres:</label>
                    <InputText
                        id="txtNombre"
                        value={autor.nombre}
                        onChange={e=>setAutor({...autor, nombre: e.target.value})}
                    />
                    <br/>
                    <label htmlFor="txtApellido">Apellidos:</label>
                    <InputText
                        id="txtApellido"
                        value={autor.apellido}
                        onChange={e=>setAutor({...autor, apellido: e.target.value})}
                    />

                </div>
                <br/>
                <Button
                    label="Guardar"
                    icon='pi pi-save'
                    onClick={guardar}//se necesita aplicar denuevo el boton de eliminar
                />
                
            </Dialog>
            <Dialog
            header="Eliminar"
            visible={dialogoEliminar}
            onHide={()=>setDialogoEliminar(false)}
            >
            <p>Estas seguro de eliminar el autor seleccionado</p>
            <Button label="si" icon= "pi pi-check-circle" onClick={eliminarAutor}/>
            <Button label="No" icon= "pi pi-times-circle" onClick={()=> setDialogoEliminar(false)}/>
            </Dialog>
            
            
        </div>
    );
}
export default ListaAutores;
