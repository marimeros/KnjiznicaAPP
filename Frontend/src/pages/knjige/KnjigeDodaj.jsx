import KnjigaService from "../../services/KnjigaService"
import { Button, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KnjigeDodaj(){

    const navigate = useNavigate()

    async function dodaj(knjiga) {
        //console.log(knjiga)
        //console.log(JSON.stringify(knjiga))
        const odgovor = await KnjigaService.dodaj(knjiga)
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
        dodaj({
            naziv: podaci.get('naziv'),
            knjizevnavrsta: podaci.get('knjizevnavrsta')
        })
    }

    return(
        <>
        Dodavanje knjige
        <Form onSubmit={obradiSubmit}>

            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="knjizevnavrsta">
                <Form.Label>Književna vrsta</Form.Label>
                <Form.Control type="text" name="knjizevnavrsta" required />
            </Form.Group>


        <Row className="akcije">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
            <Link to={RouteNames.KNJIGA_PREGLED} 
            className="btn btn-danger siroko">Odustani</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
            <Button variant="success"
            type="submit"
            className="siroko">Dodaj knjigu</Button>
            </Col>
        </Row>
        </Form>
        </>
    )
}