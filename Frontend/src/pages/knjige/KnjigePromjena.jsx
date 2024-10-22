import KnjigaService from "../../services/KnjigaService"
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";


export default function KnjigePromjena(){

    const [knjiga,setknjiga] = useState({})
    const navigate = useNavigate()
    const routeParams = useParams()

    async function dohvatiknjiga(){
        const odgovor = await KnjigaService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        //debugger; // ovo radi u Chrome inspect (ali i ostali preglednici)
        setknjiga(odgovor.poruka)
    } 

    useEffect(()=>{
        dohvatiknjiga();
     },[])

     async function promjena(knjiga) {
        //console.log(knjiga)
        //console.log(JSON.stringify(knjiga))
        const odgovor = await KnjigaService.promjena(routeParams.sifra,knjiga)
        if(odgovor.greska){
            alert(odgovor.poruka)
            return;
        }
        navigate(RouteNames.KNJIGA_PREGLED)
    }

    function obradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server
        let podaci = new FormData(e.target)
        //console.log(podaci.get('naziv'))
        promjena({
            naziv: podaci.get('naziv'),
            knjizevnavrsta: podaci.get('knjizevnavrsta')
        })
    }

    return(
        <>
        Promjena knjige
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required
                defaultValue={knjiga.naziv} />
            </Form.Group>

            <Form.Group controlId="knjizevnavrsta">
                <Form.Label>Književna vrsta</Form.Label>
                <Form.Control type="text" name="knjizevnavrsta" required
                defaultValue={knjiga.knjizevnavrsta} />
            </Form.Group>

           

        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.KNJIGA_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Promjeni knjigu</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}