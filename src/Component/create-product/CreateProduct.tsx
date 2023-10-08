import React, { useEffect, useState } from "react";
import './CreateProduct.css'
import {
    TextField
    , Avatar
    , Autocomplete
    , Box
    , Button,
    Switch,
    FormControlLabel,
    FormGroup,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Table,
} from "@mui/material";
import Axios from "../../Axios";
import { useNavigate, useParams } from "react-router-dom";
import { Add } from "@mui/icons-material";


const CreateProduct = () => {
    const initialMessageError = {
        name: '',
        ram: '',
        cpu: '',
        resolution1: '',
        resolution2: '',
        price: '',
        brand: '',
        image: '',
        widescreen: '',
        rom: '',
        dataTrain: ''
    }
    const initialError = {
        name: false,
        ram: false,
        cpu: false,
        resolution1: false,
        resolution2: false,
        price: false,
        image: false,
        brand: false,
        widescreen: false,
        rom: false,
        dataTrain: false
    }
    const option = [{
        value: "DataBigNum", label: 'Data(Big num)'
    }, {
        value: "Data(0-1)", label: 'Data(0-1)'
    }, {
        value: "DataTest", label: 'Data(test)'
    }]
    const navigate = useNavigate();
    const [error, setError] = useState(initialError);
    const [product, setProduct] = useState<any>('')
    const [lstCpu, setLstCpu] = useState([
        {
          id: 1,
          cpu_name: 'Intel Core i5-1235u'  
        },
        {
            id: 2,
            cpu_name: 'Apple M2'  
        }
    ] as any);
    const [lstGpu, setLstGpu] = useState([
        {
          id: 1,
          gpu_name: 'RTX 4080'  
        },
        {
            id: 2,
            gpu_name: 'MX550'  
        }
    ] as any);
    const [brands, setBrands] = useState([
        {
          id: 1,
          brand_name: 'Macbook'  
        },
        {
            id: 2,
            brand_name: 'Samsung'  
        }
    ] as any)
    const [messageError, setMessageError] = useState(initialMessageError);
    const [img, setImg] = useState<any | null>('');
    const [submit, setSubmit] = useState(false);
    const [dataTrain, setDataTrain] = useState('');
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(URL.createObjectURL(e.target.files[0]));
                console.log(e.target.files[0]);
                setProduct({ ...product, binary_image: reader.result, image: Date.now() + e.target.files[0].name });
                // setTest({ image_byte: reader.result, image_name: e.target.files[0].name });
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleCancel = () => {
        navigate(-1);
    }
    const valid = () => {
        let flag = false;
        let errorMessage = {} as any;
        let error1 = initialError;
        if (product.name === null || product.name === undefined || product.name === '') {
            errorMessage.name = 'Name is require';
            error1.name = true;
            flag = true;
        } else {
            error1.name = false;
        }

        if (product?.brand === undefined || product?.brand === null) {
            errorMessage.brand = 'Brand is require';
            error1.brand = true;
            flag = true;
        } else {
            error1.brand = false;
        }
        if (product?.cpu === undefined || product?.cpu === null) {
            errorMessage.cpu = 'CPU is require';
            error1.cpu = true;
            flag = true;
        } else {
            error1.cpu = false;
        }

        if (product.ram === undefined || product.ram === null || product.ram === '') {
            errorMessage.ram = 'Ram is require';
            error1.ram = true;
            flag = true;
        } else if (product.ram >= 18) {
            errorMessage.ram = 'Ram less than 18';
            error1.ram = true;
            flag = true;
        } else if (product.ram <= 0) {
            errorMessage.ram = 'Ram bigger than 0';
            error1.ram = true;
            flag = true;
        }
        else {
            error1.ram = false;
        }

        if (product.rom === undefined || product.rom === null || product.rom === '') {
            errorMessage.rom = 'Rom is require';
            error1.rom = true;
            flag = true;
        } else if (product.rom > 1024) {
            errorMessage.rom = 'Rom less than 1024';
            error1.rom = true;
            flag = true;
        } else if (product.rom <= 0) {
            errorMessage.rom = 'Rom bigger than 0';
            error1.rom = true;
            flag = true;
        } else {
            error1.rom = false;
        }

        if (product.widescreen === undefined || product.widescreen === null || product.widescreen === '') {
            errorMessage.widescreen = 'Widescreen is require';
            error1.widescreen = true;
            flag = true;
        } else if (product.widescreen <= 0) {
            errorMessage.widescreen = 'Widescreen bigger 0';
            error1.widescreen = true;
            flag = true;
        } else {
            error1.widescreen = false;
        }

        if (product.resolution1 === undefined || product.resolution1 === null || product.resolution1 === '') {
            errorMessage.resolution1 = 'Resolution1 is require';
            error1.resolution1 = true;
            flag = true;
        } else if (product.resolution1 <= 0) {
            errorMessage.resolution1 = 'Resolution1 bigger 0';
            error1.resolution1 = true;
            flag = true;
        } else {
            error1.resolution1 = false;
        }
        if (product.resolution2 === undefined || product.resolution2 === null || product.resolution2 === '') {
            errorMessage.resolution2 = 'Resolution2 is require';
            error1.resolution2 = true;
            flag = true;
        } else if (product.resolution2 <= 0) {
            errorMessage.resolution2 = 'Resolution2 bigger 0';
            error1.resolution2 = true;
            flag = true;
        } else {
            error1.resolution2 = false;
        }

        if (product.price === undefined || product.price === 0 || product.price === null || product.price === '') {
            errorMessage.price = 'Price is require';
            error1.price = true;
            flag = true;
        } else if (product.price < 0) {
            errorMessage.price = 'Price is not less then zero';
            error1.price = true;
            flag = true;
        } else {
            error1.price = false;
        }

        if (product.image === undefined || product.image === null || product.image === '') {
            errorMessage.image = 'Image is require';
            error1.image = true;
            flag = true;
        } else {
            error1.image = false;
        }

        if (dataTrain === undefined || dataTrain === null || dataTrain === '') {
            errorMessage.dataTrain = 'Please choose data train';
            error1.dataTrain = true;
            flag = true;
        } else {
            error1.dataTrain = false;
        }
        setMessageError(errorMessage);
        setError(error1);
        return flag;
    }
    const postCreateProduct = () => {
        Axios.post("phone/save", product)
            .then((res) => {
                alert(res.data);
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        console.log(messageError);
        if (Object.keys(messageError).length === 0 && submit) {
            postCreateProduct();
        }
    }, [messageError])

    const handleCreate = () => {
        valid();
        setSubmit(true);
    }

    useEffect(() => {
        Axios.get(`phone/getListCPU`)
            .then(res => {
                setLstCpu(res.data);
                console.log(res.data);

            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`phone/getListBrand`)
            .then(res => {
                setBrands(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    const filterCpu = () => {

        if (product.cpu !== null && product.cpu !== undefined) {
            for (var i in lstCpu) {
                if (product.cpu.id === lstCpu[i].id) {
                    return lstCpu[i];
                }
            }
        }
        return null;
    }
    const filterGpu = () => {

        if (product.gpu !== null && product.gpu !== undefined) {
            for (var i in lstGpu) {
                if (product.gpu.id === lstGpu[i].id) {
                    return lstGpu[i];
                }
            }
        }
        return null;
    }
    const filterBrand = () => {
        if (product.brand !== null && product.brand !== undefined) {
            for (var i in brands) {
                if (product.brand.id === brands[i].id) {
                    return brands[i];
                }
            }
        }
        return null;
    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'name') {
            setProduct({ ...product, [name]: value });
        } else {
            if (!isNaN(value)) {
                setProduct({ ...product, [name]: value });
            }
        }
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4  color="error">
                        {'Add New Laptop'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                onChange={handleChange}
                                error={error.name}
                                value={`${product.name ? product.name : ''}`}
                                label={'Name *'}
                                name="name"  color="error"/>
                            {
                                error.name && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.name}</FormHelperText>
                                </FormControl>
                            }

                        </div>
                        
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="brand"
                                options={brands}
                                //value={filterBrand()}
                                getOptionLabel={(option) => option.brand_name}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, brand: newInputValue });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.brand}
                                    label="Brand *"  color="error"/>}
                            />
                            {error.brand && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.brand}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="cpu"
                                options={lstCpu}
                                //value={filterCpu()}
                                getOptionLabel={(option) => option.cpu_name}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, cpu: newInputValue });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.cpu}
                                    label="CPU *"  color="error"/>}
                            />
                            {error.cpu && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.cpu}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="gpu"
                                options={lstGpu}
                                //value={filterGpu()}
                                getOptionLabel={(option) => option.gpu_name}
                                onChange={(event: any, newInputValue: any) => {
                                    setProduct({ ...product, gpu: newInputValue });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.cpu}
                                    label="GPU *"  color="error"/>}
                            />
                            {error.cpu && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.cpu}</FormHelperText>
                            </FormControl>}
                        </div>
                        {/* <div className="container-input">
                            <TextField
                                name="ram"
                                value={`${product.ram ? product.ram : ''}`}
                                onChange={handleChange}
                                label={'Ram (GB) *'}
                                type={'text'}
                                error={error.ram}
                            />
                            {error.ram && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.ram}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <TextField
                                name="rom"
                                value={`${product.rom ? product.rom : ''}`}
                                onChange={handleChange}
                                label={'Hard drive (GB) *'}
                                type={'text'}
                                error={error.rom}
                            />
                            {error.rom && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.rom}</FormHelperText>
                            </FormControl>}
                        </div> */}
                        <div className="container-input">
                            <Table>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <TextField
                                            name="ram"
                                            value={`${product.ram ? product.ram : ''}`}
                                            onChange={handleChange}
                                            label={'Ram (GB) *'}
                                            type={'text'}
                                            error={error.resolution1} color="error"
                                        />
                                        {error.resolution1 && <FormControl error variant="standard">
                                            <FormHelperText id="component-error-text">{messageError.resolution1}</FormHelperText>
                                        </FormControl>}
                                    </td>
                                    <td style={{ textAlign: 'right', width: "50%" }}>
                                        <TextField
                                            name="hardDrive"
                                            value={`${product.hardDrive ? product.hardDrive : ''}`}
                                            onChange={handleChange}
                                            label={'Hard drive (GB) *'}
                                            type={'text'}
                                            error={error.resolution2} color="error"
                                        />
                                        {error.resolution2 && <FormControl error variant="standard">
                                            <FormHelperText id="component-error-text">{messageError.resolution2}</FormHelperText>
                                        </FormControl>}
                                    </td>
                                </tr>
                            </Table>
                        </div>
                        <div className="container-input">
                            <TextField
                                name="widescreen"
                                value={`${product.widescreen ? product.widescreen : ''}`}
                                onChange={handleChange}
                                label={'Widescreen (inch) *'}
                                type={'text'}
                                error={error.widescreen} color="error"
                            />
                            {error.widescreen && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.widescreen}</FormHelperText>
                            </FormControl>}

                        </div>
                        <div className="container-input">
                            <TextField
                                name="weight"
                                value={`${product.weight ? product.weight : ''}`}
                                onChange={handleChange}
                                label={'Weight (KG) *'}
                                type={'text'}
                                error={error.widescreen} color="error"
                            />
                            {error.widescreen && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.widescreen}</FormHelperText>
                            </FormControl>}

                        </div>
                        <div className="container-input">
                            <TextField
                                name="price"
                                value={`${product.price ? product.price : ""}`}
                                onChange={handleChange}
                                label={'Price (VND)*'}
                                type={'text'}
                                error={error.price} color="error"
                            />
                            {error.price && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.price}</FormHelperText>
                            </FormControl>}

                        </div>
                        {/* <div className="container-input">
                            <FormControl sx={{ width: 250 }}>
                                <InputLabel id="demo-select-small">Choose data train</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={dataTrain}
                                    error={error.dataTrain}
                                    label="Choose data train"
                                    onChange={(e) => {
                                        setDataTrain(e.target.value);
                                        setProduct({ ...product, data: e.target.value });
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {option.map(data => <MenuItem value={data.value}>{data.label}</MenuItem>)}
                                </Select>
                                {error.dataTrain && <FormControl error variant="standard">
                                    <FormHelperText id="component-error-text">{messageError.dataTrain}</FormHelperText>
                                </FormControl>}
                            </FormControl>
                        </div> */}
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {<img style={{ borderColor: `${error.image ? 'red' : "black"}` }} src={img ? img : require('../../image/frame2.png')} />}
                            </div>
                            {error.image && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.image}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="btnContainer">
                            <Button variant="outlined" component="label" color="error">
                                Choose image
                                <input
                                    style={{ display: 'none' }}
                                    onChange={handleImage}
                                    accept="image/*"
                                    multiple type="file" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="btnContainer">
                    <Button sx={{ width: '150px' }} variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button sx={{ width: '200px' }} variant="contained" color="error" onClick={handleCreate}>Create new</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct;