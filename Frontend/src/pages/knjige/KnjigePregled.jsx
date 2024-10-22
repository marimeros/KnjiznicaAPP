import { useEffect, useState } from "react"
import KnjigaService from "../../services/KnjigaService"
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KnjigePregled(){

    const navigate = useNavigate()

    const[knjige, setKnjige] = useState();

    async function dohvatiKnjige(){
        const odgovor = await KnjigaService.get();
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setKnjige(odgovor.poruka)
    } 

    // Ovaj hook (kuka) se izvodi dolaskom na stranicu knjige
    useEffect(()=>{
        dohvatiKnjige();
    },[])

   


    async function brisanjeKnjige(sifra) {
        
        const odgovor = await KnjigaService.brisanje(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        dohvatiKnjige();
    }


    return(
        <>
        <Link to={RouteNames.KNJIGA_NOVI}
        className="btn btn-success siroko">Dodaj novu knjigu</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Vrsta</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {knjige && knjige.map((knjiga,index)=>(
                    <tr key={index}>
                        <td>
                            {knjiga.naziv}
                        </td>
                        <td>
                            {knjiga.knjizevnavrsta}
                        </td>
                       
                        <td>
                            <Button
                            variant="danger"
                            onClick={()=>brisanjeKnjige(knjiga.sifra)}
                            >
                                Obriši
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            onClick={()=>navigate(`/knjige/${knjiga.sifra}`)}
                            >
                                Promjena
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}