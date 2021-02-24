import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getCollection } from "./actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  const [showAddPet, setShowAddPet] = useState(false);
  const handleCloseAddPet = () => setShowAddPet(false);
  const handleShowAddPet = () => setShowAddPet(true);

  const [showDeletePet, setShowDeletePet] = useState(false);
  const handleCloseDeletePet = () => setShowDeletePet(false);
  const handleShowDeletePet = () => setShowDeletePet(true);

  const [pet, setPet] = useState("");
  const [pets, setPets] = useState([]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getCollection("pets");
      if (result.statusResponse) {
        setPets(result.data);
      }
    })();
  }, []);

  const addPet = async (e) => {
    console.log("prueba");
    e.preventDefault();

    // if (!validForm()) {
    //   return;
    // }

    // const result = await addDocument("tasks", { name: task });
    // if (!result.statusResponse) {
    //   setError(result.error);
    //   return;
    // }
    // setTasks([...pets, { id: result.data.id, name: task }]);
    setPets([...pets, pet]);
    setPet("");
  };

  const editTask = (thePet) => {
    // setPet(thePet.name);
    // setEditMode(true);
    // setId(thePet.id);
  };
  return (
    <div className="App">
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-4">
            <h4 className="page-title">Mascotas registradas</h4>
          </div>
          <div className="col-md-3 offset-md-5">
            <button
              className="btn btn-success btn-block"
              onClick={handleShowAddPet}
            >
              <i className="fa fa-plus-square fa-2x d-block"></i>
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
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr>
                      <td>{pet.name}</td>
                      <td>{pet.breed}</td>
                      <td>{pet.date}</td>
                      <td>{pet.owner}</td>
                      <td>{pet.phone}</td>
                      <td>{pet.email}</td>
                      <td>{pet.address}</td>
                      <td className="d-flex justify-content-around">
                        <button
                          onClick={handleShowAddPet}
                          className="btn btn-warning btn-sm"
                        >
                          <i className="fa fa-pen fa-lg"></i>
                        </button>
                        <button
                          onClick={handleShowDeletePet}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fa fa-trash fa-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Add pet */}
      <Modal
        show={showAddPet}
        onHide={handleCloseAddPet}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addPet}>
            <div className="container pr-5 pl-5">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre mascota" />
                  </Form.Group>
                  <Form.Group controlId="formBasicBreed">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Bulldog Inglés "
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicDate">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control type="date" />
                  </Form.Group>
                  <Form.Group controlId="formBasicOwner">
                    <Form.Label>Propietario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre propietario"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="number" placeholder="Teléfono" />
                  </Form.Group>
                  <Form.Group controlId="formBasicAddress">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                </div>
                <div className="col-md-6 offset-md-3 text-center">
                  <Button
                    variant="success"
                    className="btn btn-block"
                    onClick={handleCloseAddPet}
                    type="submit"
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPet}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete pet */}
      <Modal
        show={showDeletePet}
        onHide={handleCloseDeletePet}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex align-self-center">
          <i className="fas fa-exclamation-triangle fa-3x text-warning mx-3"></i>
          Estás seguro de eliminar la mascota:{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletePet}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleCloseDeletePet}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
