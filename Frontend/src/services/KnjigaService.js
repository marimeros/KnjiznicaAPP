import { HttpService } from "./HttpService";



async function get(){
    return await HttpService.get('/Knjiga')
    .then((odgovor)=>{
        //console.log(odgovor.data)
        //console.table(odgovor.data)
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        //console.log(e)
        return {greska: true, poruka: 'Problem kod dohvaćanja Knjigaova'}   
    })
}

async function brisanje(sifra){
    return await HttpService.delete('/Knjiga/' + sifra)
    .then(()=>{
        return {greska: false, poruka: 'Obrisano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod brisanja Knjigaa'}   
    })
}

async function dodaj(Knjiga){
    return await HttpService.post('/Knjiga',Knjiga)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Knjigaa'}   
    })
}

async function promjena(sifra,Knjiga){
    return await HttpService.put('/Knjiga/' + sifra,Knjiga)
    .then(()=>{
        return {greska: false, poruka: 'Dodano'}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Problem kod dodavanja Knjigaa'}   
    })
}

async function getBySifra(sifra){
    return await HttpService.get('/Knjiga/'+sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Problem kod dohvaćanja Knjigaa s šifrom '+sifra}   
    })
}


export default {
    get,
    brisanje,
    dodaj,
    getBySifra,
    promjena
}
