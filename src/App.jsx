import { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from "./database/actions";
import Footer from "./components/footer";
import * as moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

function App() {
  const currentDate = moment().format("YYYY-MM-DD");
  console.log(currentDate);
  const [showAddPet, setShowAddPet] = useState(false);
  const handleCloseAddPet = () => {
    setPet({
      name: "",
      breed: "",
      date: "",
      owner: "",
      phone: "",
      email: "",
      address: "",
    });
    setShowAddPet(false);
    setEditMode(false);
  };
  const handleShowAddPet = () => setShowAddPet(true);

  const [showDeletePet, setShowDeletePet] = useState(false);
  const handleCloseDeletePet = () => setShowDeletePet(false);
  const handleShowDeletePet = () => setShowDeletePet(true);

  const [pet, setPet] = useState({
    id: "",
    name: "",
    breed: "",
    date: "",
    owner: "",
    phone: "",
    email: "",
    address: "",
  });
  const [pets, setPets] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("pets");
      if (result.statusResponse) {
        setPets(result.data);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(pet)) {
      setError("Debes ingresar la información de una mascota...");
      isValid = false;
    }
    return isValid;
  };

  const addPet = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("pets", {
      name: pet.name,
      breed: pet.breed,
      date: pet.date,
      owner: pet.owner,
      phone: pet.phone,
      email: pet.email,
      address: pet.address,
    });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    setPets([
      ...pets,
      {
        id: result.data.id,
        name: pet.name,
        breed: pet.breed,
        date: pet.date,
        owner: pet.owner,
        phone: pet.phone,
        email: pet.email,
        address: pet.address,
      },
    ]);
    setPet({
      id: "",
      name: "",
      breed: "",
      date: "",
      owner: "",
      phone: "",
      email: "",
      address: "",
    });
    handleCloseAddPet();
  };

  const deletePetModal = (id) => {
    const petFiltered = pets.find((pet) => pet.id === id);
    setPet({
      id: petFiltered.id,
      name: petFiltered.name,
      breed: petFiltered.breed,
      date: petFiltered.date,
      owner: petFiltered.owner,
      phone: petFiltered.phone,
      email: petFiltered.email,
      address: petFiltered.address,
    });
    handleShowDeletePet();
    setId(id);
  };

  const deletePet = async () => {
    const result = await deleteDocument("pets", id);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    const filterPet = pets.filter((pet) => pet.id !== id);
    setPets(filterPet);
    setPet({
      id: "",
      name: "",
      breed: "",
      date: "",
      owner: "",
      phone: "",
      email: "",
      address: "",
    });
    setId("");
    handleCloseDeletePet();
  };

  const editPet = (thePet) => {
    setPet({
      id: thePet.id,
      name: thePet.name,
      breed: thePet.breed,
      date: thePet.date,
      owner: thePet.owner,
      phone: thePet.phone,
      email: thePet.email,
      address: thePet.address,
    });
    setEditMode(true);
    setId(thePet.id);
    handleShowAddPet();
  };

  const savePet = async (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }

    const result = await updateDocument("pets", id, {
      name: pet.name,
      breed: pet.breed,
      date: pet.date,
      owner: pet.owner,
      phone: pet.phone,
      email: pet.email,
      address: pet.address,
    });

    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedPets = pets.map((item) =>
      item.id === id ? { id, ...pet } : item
    );
    setPets(editedPets);
    setEditMode(false);
    setPet({
      name: "",
      breed: "",
      date: "",
      owner: "",
      phone: "",
      email: "",
      address: "",
    });
    setId("");
    handleCloseAddPet();
  };
  return (
    <div className="App">
      <div className="container-fluid mt-5 pr-5 pl-5">
        <div className="row">
          <div className="col-md-10">
            <h3 className="page-title">
              <em className="fas fa-paw fa-2x mx-3"></em>Gestión de Mascotas
            </h3>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-info btn-block"
              onClick={handleShowAddPet}
            >
              <em className="fa fa-plus-square fa-2x d-block"></em>
              Agregar mascota
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 card-box">
            <div className="table-responsive">
              {size(pets) === 0 ? (
                <li className="list-group-item text-center">
                  Aún no hay mascotas registradas.
                </li>
              ) : (
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th>Nombre mascota</th>
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
                      <tr key={pet.id}>
                        <td className="text-capitalize">{pet.name}</td>
                        <td className="text-capitalize">{pet.breed}</td>
                        <td>{pet.date} </td>
                        <td className="text-capitalize">{pet.owner}</td>
                        <td>{pet.phone}</td>
                        <td>{pet.email}</td>
                        <td>{pet.address}</td>
                        <td className="d-flex justify-content-around">
                          <button
                            onClick={() => editPet(pet)}
                            className="btn btn-warning btn-sm"
                          >
                            <em className="fa fa-pen fa-lg"></em>
                          </button>
                          <button
                            onClick={() => deletePetModal(pet.id)}
                            className="btn btn-danger btn-sm"
                          >
                            <em className="fa fa-trash fa-lg"></em>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* Modal Add pet */}
      <Modal
        show={showAddPet}
        onHide={handleCloseAddPet}
        backdrop="static"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editMode ? "Modificar mascota" : "Agregar nueva mascota"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editMode ? savePet : addPet}>
            {error && <span className="text-danger ">{error}</span>}
            <div className="container pr-5 pl-5">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre mascota</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      type="text"
                      placeholder="Nombre mascota"
                      name="name"
                      onChange={handleInputChange}
                      value={pet.name}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicBreed">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      type="text"
                      placeholder="Ej: Bulldog Inglés "
                      name="breed"
                      onChange={handleInputChange}
                      value={pet.breed}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicDate">
                    <Form.Label>Fecha Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      onChange={handleInputChange}
                      value={pet.date}
                      max={currentDate}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicOwner">
                    <Form.Label>Propietario</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      type="text"
                      placeholder="Nombre propietario"
                      name="owner"
                      onChange={handleInputChange}
                      value={pet.owner}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Teléfono"
                      name="phone"
                      onChange={handleInputChange}
                      value={pet.phone}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicAddress">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Dirección"
                      name="address"
                      onChange={handleInputChange}
                      value={pet.address}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleInputChange}
                      value={pet.email}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6 offset-md-3 text-center">
                  <Button
                    variant="success"
                    className={
                      editMode
                        ? "btn btn-warning btn-block btn-lg"
                        : "btn btn-info btn-block btn-lg"
                    }
                    type="submit"
                  >
                    {editMode ? "Guardar" : "Agregar"}
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
        <Modal.Body className="d-flex align-self-center mt-5">
          <em className="far fa-sad-cry fa-5x mx-3"></em>
          <h4 className="text-center">
            Estás seguro de eliminar a: {pet.name}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeletePet}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deletePet()}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
