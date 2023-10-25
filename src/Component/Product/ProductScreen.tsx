import React, { useState, useEffect } from 'react';
import { Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CardItem from '../CardItem/CardItem';
import Axios from '../../Axios';
import './ScreenCard.css';
import { Link, useNavigate } from 'react-router-dom';
import {  Autocomplete, Button, FormControl, TextField } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import Paging from './paging';

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
    const [numPage, setNumPage] = useState(0);
    const rowPerPage = 10;
    const [page, setPage] = useState(1);
    const [labelId, setLabelId] = useState();
    const [brandId, setBrandId] = useState();
    const [brand, setBrand] = useState({
        brandId: '',
        brandName: ''
    });
    const [brands, setBrands] = useState([] as any)
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
                    setNumPage(Math.ceil(listProduct.length / rowPerPage)); // get number of page
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loading]);
    useEffect(() => {
        Axios.get(`brand`)
            .then(res => {
                setBrands(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
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
                setNumPage(Math.ceil(listProduct.length / rowPerPage));
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
                setNumPage(Math.ceil(listProduct.length / rowPerPage)); // get number of page
            }).catch(e => {
                console.log(e);
            })
        }

    }
    const handleChange = (event: any, newDemand: any) => {
        
        console.log(newDemand.target.value)
        setLabelId(newDemand.target.value)
        if (newDemand.target.value === "") {
            setLoading(true);
        } else {
            console.log(demand)
            Axios.get(`laptop`, {
                params: {
                    label: newDemand.target.value
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
                setNumPage(Math.ceil(listProduct.length / rowPerPage)); // get number of page
                setPage(1)
            }).catch(e => {
                console.log(e);
            })
        }
    }
    const handleClickReset = () => {
        setLoading(true);
        window.location.reload()
    }
    const handleClickAdd = () => {
        navigate("/create");
    }
    const handleClickUpdate = (laptopId : any) => {
        navigate(`/update/${laptopId}`);
      };
    return (
        <Container>
            <Container>
                <div className='container-header'>
                    <div className="left">
                        <FormControl sx={{ m: 1, width: 200 }}>
                        <TextField
                                name=""
                                value={`${demand ? demand : ''}`}
                                onChange={(e)=>setDemand(e.target.value)}
                                label={'Nhập nhu cầu tìm kiếm'}
                                type={'text'} color="error"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: 100 }}>
                            <Button onClick={handleClickFind} variant='outlined' color='error' sx={{ height: '55px' }}>Tìm kiếm</Button>
                        </FormControl>
                        
                        <ToggleButtonGroup style={{width: 500, marginLeft: 50, marginTop: 20, height: 30}}
                            name='ddd'
                            type='radio'
                            value={labelId}
                            onChange={handleChange}
                            >
                            <ToggleButton variant = 'outlined' color='error' id='1' value='0'>Gamming</ToggleButton>
                            <ToggleButton variant = 'outlined' color='error' id='2' value="1">Học tập, văn phòng</ToggleButton>
                            <ToggleButton variant = 'outlined' color='error' id='3' value="2">Kỹ thuật, đồ họa</ToggleButton>
                        </ToggleButtonGroup>
                        <FormControl sx={{ m: 1, width: 50 ,marginLeft: 0, marginTop: 3}}>
                            <Button onClick={handleClickReset} variant='outlined' color='error' sx={{ height: '30px', width:'50px' }}><RestartAlt/></Button>
                        </FormControl>
                    </div>
                    <div className="right">
                        <FormControl sx={{ m: 1, width: 50 }}>
                            <Button onClick={handleClickAdd} variant='contained' color='error' sx={{ height: '55px', width:'200px' }}>Thêm mới</Button>
                        </FormControl>
                    </div>
                </div>
                <div className='container clearfix'>
                    <h4 className='float-start'></h4>
                </div>
                <div className="wrapper-item">
                    {(products.slice((page - 1) * rowPerPage, page * rowPerPage) || []).map((item: any) => (
                        <CardItem
                            item={item}
                            onClick={() => handleClickUpdate(item.laptopId)}
                        />
                    ))}
                </div>
                <div className='container clearfix'>
                    <h4 className='float-start'></h4>
                </div>
                <Paging numPage={numPage} setPage={setPage} page={page} />
            </Container>
        </Container >
    );
}

export default ProductScreen;