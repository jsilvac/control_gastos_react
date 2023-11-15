import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { formatearCantidad } from "../src/helpers"

const ControlPresupuesto = ({ 
    presupuesto,
    setPresupuesto, 
    gastos,
    setGastos,
    setIsValidPresupuesto
  }) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {

    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed();
    
    setDisponible(totalDisponible);
    setGastado(totalGastado);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 500);

  }, [gastos])

  const handleResetApp = () => {
    const result = confirm('Desear reiniciar Presupuesto y gastos?');

    if (result){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (

    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : 'indigo',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : ''
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />

      </div>
      <div className="contenido-presupuesto">
          <button
            className="reset-app"
            type="button"
            onClick={handleResetApp}
            >
              Resetear App
            </button>
        <p>
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto