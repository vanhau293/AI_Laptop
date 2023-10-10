import React, { useState, useEffect, useRef } from 'react';
import { Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CardItem from '../CardItem/CardItem';
import Axios from '../../Axios';
import './ScreenCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Select, Table, TextField } from '@mui/material';
import { Add, Filter, FilterAlt, Label, RestartAlt } from '@mui/icons-material';
import { AnyNsRecord } from 'dns';

const ProductScreen = (props: any) => {
    const option = [
        { value: "A", label: "Bình dân" },
        { value: "B", label: "Tầm trung" },
        { value: "C", label: "Cao cấp" }];
    const navigate = useNavigate();
    const [products, setProducts] = useState([] as any);
    const [filter, setFilter] = useState('');
    const [demand, setDemand] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            Axios.get('laptop')
                .then((res) => {
                    const listProduct = res.data;
                    setProducts(
                        listProduct.map((p: any) => {
                            return {
                                laptopId: p.laptopId,
                                image: p.image,
                                laptopName: p.laptopName,
                                price: p.price,
                                labelName: p.label.labelName,
                                rating: p.rating
                            };
                        })
                    );
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loading]);
    const handleClickFilter = () => {
        if (filter === "") {
            setLoading(true);
        } else {
            Axios.get(`phone/findPhoneByLabel`, {
                params: {
                    filter: filter
                }
            }).then(res => {
                const listProduct = res.data;
                setProducts(
                    listProduct.map((p: any) => {
                        return {
                            id: p.id,
                            img: p.image,
                            product_name: p.name,
                            price: p.price,
                            label: p.label
                        };
                    })
                );
            }).catch(e => {
                console.log(e);
            })
        }

    }
    const handleClickFind = () => {
        if (demand === "") {
            setLoading(true);
        } else {
            console.log(demand)
            Axios.get(`laptop`, {
                params: {
                    demand: demand
                }
            }).then(res => {
                const listProduct = res.data;
                setProducts(
                    listProduct.map((p: any) => {
                        return {
                            laptopId: p.laptopId,
                            image: p.image,
                            laptopName: p.laptopName,
                            price: p.price,
                            labelName: p.label.labelName,
                            rating: p.rating
                        };
                    })
                );
            }).catch(e => {
                console.log(e);
            })
        }

    }
    const handleClickReset = () => {
        setLoading(true);
        setFilter("");
    }
    const handleClickAdd = () => {
        navigate("/create");
    }
    return (
        <Container>
            <Container>
                <div className='container-header'>
                    <div className="left">
                        <FormControl sx={{ m: 1, width: 250 }}>
                            <InputLabel htmlFor="component-outlined" color='error'>Demand</InputLabel>
                            <OutlinedInput
                            id="component-outlined"
                            color='error'
                            label="Demand"
                            name='demand'
                            onChange={(e)=>setDemand(e.target.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 50 }}>
                            <Button onClick={handleClickFind} variant='outlined' color='error' sx={{ height: '55px' }}>Find</Button>
                        </FormControl>
                        {/* <FormControl sx={{ m: 1, width: 250, marginLeft: 10 }}>
                            <InputLabel id="demo-select-small">Filter</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={filter}
                                label="Label"
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {option.map(data => <MenuItem value={data.value}>{data.label}</MenuItem>)}
                            </Select>
                        </FormControl> */}
                        {/* <FormControl sx={{ m: 1, width: 50, marginLeft: 20, marginTop: 3}}>
                            <Button onClick={handleClickFilter} variant='contained' color='error' sx={{ height: '30px', width:'100px' }}>#Gamming</Button>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 50 ,marginLeft: 7, marginTop: 3}}>
                            <Button onClick={handleClickReset} variant='contained' color='error' sx={{ height: '30px', width:'100px' }}>#VănPhòng</Button>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 50 ,marginLeft: 7, marginTop: 3}}>
                            <Button onClick={handleClickReset} variant='contained' color='error' sx={{ height: '30px', width:'100px' }}>#KỹThuật</Button>
                        </FormControl> */}
                        <ToggleButtonGroup style={{width: 500, marginLeft: 100, marginTop: 20, height: 30}}
                            name='ddd'
                            type='radio'
                            >
                            <ToggleButton variant = 'outlined' color='error' id='1' value="web">Gamming</ToggleButton>
                            <ToggleButton variant = 'outlined' color='error' id='2' value="android">Học tập, văn phòng</ToggleButton>
                            <ToggleButton variant = 'outlined' color='error' id='3' value="ios">Kỹ thuật, đồ họa</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="right">
                        <FormControl sx={{ m: 1, width: 50 }}>
                            <Button onClick={handleClickAdd} variant='contained' color='error' sx={{ height: '55px', width:'200px' }}>Add new laptop</Button>
                        </FormControl>
                    </div>
                </div>
                <div className='container clearfix'>
                    <h4 className='float-start'></h4>
                </div>
                <div className="wrapper-item">
                    {products.map((item: any) => (
                        <CardItem
                            item={item}
                        />
                    ))}
                </div>
            </Container>
        </Container >
    );
}

export default ProductScreen;