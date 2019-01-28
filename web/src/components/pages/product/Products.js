import React, { Component } from 'react';
import { Form, Input, Container, Spinner, Button, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Product from './Product';
import { productService } from '../../../services/productService';

class Products extends Component {
    state = {
        isLoading: false,
        products: [],
        error: null,
        modal: false,
        name: '',
        description: '',
        productId: null
    }

    componentDidMount = () => {
        this.getProducts();
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal,
            productId: null
        });
    }

    onEditProduct = (id, name, description) => {
        this.setState({
            modal: true,
            name: name,
            description: description,
            productId: id
        });
    }

    onAddProduct = () => {
        this.setState({
            modal: true,
            name: '',
            description: '',
        });
    }

    onNameChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    onDescriptionChange = event => {
        this.setState({
            description: event.target.value
        });
    };

    getProducts = () => {
        this.setState({
            isLoading: true
        }, () => {
            productService.getProducts().then(response => {
                this.setState({isLoading: false});
                if (response.success) {
                    this.setState({
                        products: response.data
                    })
                } else {
                    this.setState({
                        error: response.data.message
                    })
                }
            });
        });
    }

    onAccept = (event) => {
        event.preventDefault();
        if (this.state.name === '' || this.state.description === '') {
            return;
        }

        if (this.state.productId) {
            this.editProduct();
            return;
        }
        this.addProduct();
    }

    addProduct = () => {
        const newProduct = {
            Name: this.state.name,
            Description: this.state.description
        }
        this.toggleModal();
        this.setState({
            isLoading: true
        }, () => {
            productService.add(newProduct).then(response => {
                this.setState({isLoading: false});
                if (response.success) {
                    this.getProducts()
                } else {
                    this.setState({
                        error: response.data.message
                    })
                }
            });
        });
    }

    onDeleteProduct = (id) => {
        this.setState({
            isLoading: true
        }, () => {
            productService.deleteProduct(id).then(response => {
                this.setState({isLoading: false});
                if (response.success) {
                    this.getProducts()
                } else {
                    this.setState({
                        error: response.data.message
                    })
                }
            });
        });
    }

    editProduct = () => {
        const newProduct = {
            Id: this.state.productId,
            Name: this.state.name,
            Description: this.state.description
        }
        this.toggleModal();
        this.setState({
            isLoading: true
        }, () => {
            productService.update(newProduct).then(response => {
                this.setState({isLoading: false});
                if (response.success) {
                    this.getProducts()
                } else {
                    this.setState({
                        error: response.data.message
                    })
                }
            });
        });
    }

    render() {

        const error = ( this.state.error &&
            <div className='alert alert-danger' role='alert'>
                {this.state.error}
            </div>);

        const productItems = this.state.products.map(product => {
            return (
                <ListGroupItem key={product.id}>
                    <Product
                        name={product.name}
                        description={product.description}
                        id={product.id}
                        onEdit={() => this.onEditProduct(product.id, product.name, product.description)}
                        onDelete={() => this.onDeleteProduct(product.id)}/>
                </ListGroupItem>
            )
        });

        const spinner = this.state.isLoading && <Spinner color="primary" />;

        return (
            <Container>
                <Button className='mb-2' color="primary" onClick={this.onAddProduct}>Dodaj produkt</Button>
                {spinner}
                {error}
                <ListGroup>
                    {productItems}
                </ListGroup>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <Form onSubmit={this.onAccept}>
                        <ModalHeader toggle={this.toggleModal}>{this.state.productId ? "Edytuj produkt" : "Dodaj produkt"}</ModalHeader>
                        <ModalBody>
                            <Input className='mb-1' type="text" name="name" value={this.state.name} onChange={this.onNameChange} placeholder="Nazwa" required />
                            <Input type="text" name="description" value={this.state.description} onChange={this.onDescriptionChange} placeholder="Opis" required />
                        </ModalBody>
                        <ModalFooter>
                            <Button className='mr-2' type="submit" color="primary">Zapisz</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Anuluj</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Container>
        );
    }
}

export default Products;
