import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const Product = (props) => {
    return (
        <Card>
            <CardBody>
                <CardTitle><strong>{props.name}</strong></CardTitle>
                <CardSubtitle>{props.description}</CardSubtitle>
                <Button color='primary' className='mr-2 mt-2' onClick={() => props.onEdit()}>Edytuj</Button>
                <Button color='danger' className='mt-2' onClick={() => props.onDelete()}>Usuń</Button>
            </CardBody>
        </Card>
    )
}

export default Product;