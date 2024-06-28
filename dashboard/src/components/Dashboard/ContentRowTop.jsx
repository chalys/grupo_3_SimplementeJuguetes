import React, { useEffect, useState } from "react";
import { ContentData } from "./ContentData.jsx";
import Spinner from "../Reuse/Spinner.jsx";
import Alert from "../Reuse/Alert.jsx";
import CategoryItem from "./CategoryItem.jsx";
import Modal from "../Reuse/Modal.jsx";

function ContentRowTop({ data }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState({
    metrics: true,
    categories: true,
    lastProduct: true,
  });

  const [errors, setErrors] = useState({
    metrics: "",
    categories: "",
    lastProduct: "",
  });

  const [categories, setCategories] = useState([]);
  const [lastProduct, setLastProduct] = useState({});
  const [lastCategory, setLastCategory] = useState({});
  const [lastUser, setLastUser] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const endpoint = "http://localhost:3030/api/metrics";
        const { ok, data } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setMetrics(data);

        setTimeout(() => {
          setLoading({
            ...loading,
            metrics: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          metrics: error.message,
        });
      }
    };

    const getCategories = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT name FROM categories";
        const { ok, data } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setCategories(data);

        setTimeout(() => {
          setLoading({
            ...loading,
            categories: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          categories: error.message,
        });
      }
    };
    const getLastProduct = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT * FROM products WHERE createdAt = (SELECT MAX(createdAt) FROM products) LIMIT 1";
        const {
          ok,
          data: [product],
        } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setLastProduct(product);

        setTimeout(() => {
          setLoading({
            ...loading,
            lastProduct: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          lastProduct: error.message,
        });
      }
    };

    const getLastCategory = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT * FROM categories WHERE createdAt = (SELECT MAX(createdAt) FROM categories) LIMIT 1";
        const {
          ok,
          data: [category],
        } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setLastCategory(category);

        setTimeout(() => {
          setLoading({
            ...loading,
            lastCategory: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          lastCategory: error.message,
        });
      }
    };

    const getLastUser = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT * FROM users WHERE createdAt = (SELECT MAX(createdAt) FROM users) LIMIT 1";
        const {
          ok,
          data: [user],
        } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setLastUser(user);

        setTimeout(() => {
          setLoading({
            ...loading,
            lastUser: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          lastUser: error.message,
        });
      }
    };

    getMetrics();
    getCategories();
    getLastCategory();
    getLastProduct();
    getLastUser();
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  return (
    <React.Fragment>
      {/*<!-- Content Row Top -->*/}
      <div className="container-fluid">
        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>

        {/*<!-- Content Row Movies-->*/}
        <div className="row ">
          {!loading.metrics ? (
            metrics.map((el, i) => {
              return <ContentData key={i} {...el} />;
            })
          ) : (
            <Spinner containerClassName={"m-auto my-4"} />
          )}
        </div>
        {Object.values(errors).some((msg) => msg) &&
          Object.values(errors)
            .filter((msg) => msg)
            .map((msg) => {
              return <Alert message={msg} />;
            })}
        {/*<!-- Content Row Last Movie in Data Base -->*/}
        <div className="row">
          {/*<!-- Last Movie in DB -->*/}
          <div className="col-lg-4 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Ultimo producto agregado : <strong>{lastProduct.name}</strong>
                </h5>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    style={{ width: 40 + "rem" }}
                    src={`http://localhost:3030/api/products/${lastProduct.firstImg}`}
                    alt={lastProduct.name}
                  />
                </div>
                <p>{lastProduct.description}</p>
                <button
                  className="btn btn-danger"
                  rel="nofollow"
                  onClick={handleOpenModal}
                >
                  Ver mas
                </button>
              </div>
            </div>
          </div>
          {/*<!-- End content row last movie in Data Base -->*/}
          <div className="col-lg-4 mb-4">
            <div className="row">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h5 className="m-0 font-weight-bold text-gray-800">
                    Último usuario agregado:
                  </h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                      src={`http://localhost:3030/api/users/${lastUser.userPicture}`}
                      alt={lastUser.userName}
                    />
                    <div>
                      <strong>{lastUser.name}</strong>
                      <div>ID: {lastUser.id}</div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-5">
                      <strong>Email:</strong>
                    </div>
                    <div className="col-md-7">{lastUser.email}</div>
                    <div className="col-md-5">
                      <strong>Dirección:</strong>
                    </div>
                    <div className="col-md-7">{lastUser.street}</div>
                    <div className="col-md-5">
                      <strong>Número de Teléfono:</strong>
                    </div>
                    <div className="col-md-7">{lastUser.phoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h5 className="m-0 font-weight-bold text-gray-800">
                    Ultima categoria agregada :{" "}
                    <strong>{lastCategory.name}</strong>
                  </h5>
                </div>
                <div className="card-body">
                  <p>{lastCategory.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Categorias
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {categories.map(({ name }) => (
                    <CategoryItem key={name} name={name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal active={showModal} onClose={handleCloseModal} />
      {/*<!--End Content Row Top-->*/}
    </React.Fragment>
  );
}
export default ContentRowTop;
