import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import "./admin.css";

export const UpdateContractors = () => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [contractorToRemove, setContractorToRemove] = useState();
    const [contractorToAdd, setContractorToAdd] = useState("");
    const [summary, setSummary] = useState("");
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);

    useEffect(() => {
        axios.get('/api/contractor/noproject').then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="mx-auto w-100">Loading...</div>;
    }

    let handleDropdownSelect = (e) => {
        setContractorToRemove(e);
        setAdded(false);
        setRemoved(false);
        console.log(e);
    }

    let handleRemove = async () => {

        axios.delete(`/api/contractor/${contractorToRemove}`, {
        })
        .then(function(res){

            setRemoved(true);

            axios.get('/api/contractor/noproject').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    let handleNewContractor = (e) => {
        setContractorToAdd(e.target.value);
        setAdded(false);
        setRemoved(false);
    }

    let handleSummary = (e) => {
        setSummary(e.target.value);
        setAdded(false);
        setRemoved(false);
    }

    let handleAdd = async (e) => {
        e.preventDefault();

        axios.post('/api/contractor', {
            contractor_name: contractorToAdd,
            summary: summary
        })
        .then(function(res){
            // res.data.insertId

            setAdded(true);

            axios.get('/api/contractor/noproject').then(response => {
                setData(response.data);
                setLoading(false);
            });
        })
        .catch(function (err){
            console.log(err);
        });
    }

    return (
        <div>
            <Container>
                <Row><h4>Update Contractors</h4></Row>
                <Row>
                    <h5 style={{marginTop:"3%"}}>Add Contractor</h5>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Contractor:</Form.Label>
                            <Col sm={7}>
                                <Form.Control type="contractor" placeholder='Contractor' onChange={handleNewContractor} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Summary</Form.Label>
                            <Col sm={7}>
                                <Form.Control as="textarea" placeholder="Enter Summary" type="summary" onChange={handleSummary} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button className='submit-new-project admin mx-auto' onClick={handleAdd}>Submit</Button>
                </Row>
                <Row>
                    <Col>
                        {added ? <div style={{marginBottom:"5%"}}>Successfully added.</div> : null}
                    </Col>
                </Row>
                <Row>
                    <h5>Remove Contractor</h5>
                    <Col>
                        <DropdownButton style={{marginTop:"2%"}} className='dropdown' title="Contractors">
                            {data.map(({id, contractor_name, summary}) => (
                                <Dropdown.Item key={id} eventKey={id} onSelect={handleDropdownSelect}>
                                    {contractor_name}
                                </Dropdown.Item>
                            ))
                            }
                        </DropdownButton> 
                    </Col>
                    <Col>
                        <Button className='submit-new-project admin remove' onClick={handleRemove}>Remove</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {removed ? <div>Successfully Removed.</div> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}