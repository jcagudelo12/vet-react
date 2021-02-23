import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <h4 className="page-title">Mascotas registradas</h4>
          </div>
          <div className="col-md-3 offset-md-5">
            <button className="btn btn-success btn-block" onClick={handleShow}>
              <i className="fa fa-plus"></i>
              Agregar mascota
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo (Raza)</th>
                    <th>Fecha de nacimiento</th>
                    <th>Propietario</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Abby</td>
                    <td>BULLDOG INGLES (CANINOS)</td>
                    <td>1 de Diciembre de 2020 (29 dias)</td>
                    <td>
                      <a href="/clientes/detalle_cliente/519/" title="Ver">
                        Manuela Lopera Restrepo
                      </a>
                    </td>
                    <td>
                      <a
                        className="hidden-xs action-icon dropdown-toggle"
                        title="Editar"
                      >
                        <i className="fa fa-pencil fa-lg"></i>
                      </a>
                      <a
                        className="hidden-xs action-icon dropdown-toggle"
                        title="Eliminar"
                      >
                        <i className="fa fa-trash fa-lg"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>Abby</td>
                    <td>BULLDOG INGLES (CANINOS)</td>
                    <td>1 de Diciembre de 2020 (29 dias)</td>
                    <td>
                      <a href="/clientes/detalle_cliente/519/" title="Ver">
                        Manuela Lopera Restrepo
                      </a>
                    </td>
                    <td>
                      <a
                        className="hidden-xs action-icon dropdown-toggle"
                        title="Editar"
                      >
                        <i className="fa fa-pencil fa-lg"></i>
                      </a>
                      <a
                        className="hidden-xs action-icon dropdown-toggle"
                        title="Eliminar"
                      >
                        <i className="fa fa-trash fa-lg"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
          <Button variant="success" onClick={handleClose}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
