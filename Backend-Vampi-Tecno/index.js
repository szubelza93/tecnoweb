import express from 'express';
import { PORT } from './config.js';
import { ocupacionRouter } from './src/routes/ocupacion.routes.js';
import { gradInsRouter } from './src/routes/gradins.routes.js';
import { lugNaciRouter } from './src/routes/lugnaci.routes.js';
import { zonaDirRouter } from './src/routes/zonadir.routes.js';
import { tipoDidRouter } from './src/routes/tipodid.routes.js';
import { clubDonRouter } from './src/routes/clubdon.routes.js';
import { donanteRouter } from './src/routes/donante.routes.js';
import { grupSanRouter } from './src/routes/screening/grupsan.routes.js';
import { tipoDonRouter } from './src/routes/screening/tipodon.routes.js';
import { tipoCenRouter } from './src/routes/screening/tipocen.routes.js';
import { screeniRouter } from './src/routes/screening/screeni.routes.js';
import { cuestioRouter } from './src/routes/screening/cuestio.routes.js';


const app=express();
app.use(express.json())
//MODULO DONANTES
app.use('/api/ocupacion',ocupacionRouter)
app.use('/api/gradins', gradInsRouter);
app.use('/api/lugnaci',lugNaciRouter);
app.use('/api/zonadir', zonaDirRouter);
app.use('/api/tipodid', tipoDidRouter);
app.use('/api/clubdon', clubDonRouter);
app.use('/api/donante', donanteRouter);

//MODULO SCREENING
app.use('/api/grupsan', grupSanRouter);
app.use('/api/tipodon', tipoDonRouter);
app.use('/api/tipocen', tipoCenRouter);
app.use('/api/screeni', screeniRouter);
app.use('/api/cuestio', cuestioRouter);


app.listen(PORT);
console.log(`Server is running on port`,PORT);