import React, { useEffect, useState } from "react";
import '../create-product/CreateProduct.css'
import {
    TextField
    , Autocomplete
    , Button,
    FormControl,
    FormHelperText,
    Table,
} from "@mui/material";
import Axios from "../../Axios";
import { useNavigate, useParams } from "react-router-dom";


const UpdateProduct = () => {
    const initialMessageError = {
        name: '',
        ram: '',
        cpu: '',
        gpu: '',
        weight:'',
        hardDrive: '',
        price: '',
        brand: '',
        image: '',
        wideScreen: '',
        data: ''
    }
    const initialError = {
        name: false,
        ram: false,
        cpu: false,
        gpu: false,
        weight: false,
        hardDrive: false,
        price: false,
        image: false,
        brand: false,
        wideScreen: false,
        data:false
    }
    const option = [{
        value: "0", label: 'Bộ dữ liệu test'
    }, {
        value: "1", label: 'Bộ dữ liệu chính'
    }]

    let { laptopId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(initialError);
    const [updatedProduct, setUpdatedProduct] = useState<any>('')
    const [lstCpu, setLstCpu] = useState([] as any);
    const [lstGpu, setLstGpu] = useState([] as any);
    const [brands, setBrands] = useState([] as any)
    const [messageError, setMessageError] = useState(initialMessageError);
    const [img, setImg] = useState<any | null>('');
    const [submit, setSubmit] = useState(false);
    const [product, setProduct]= useState<any>('')
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(URL.createObjectURL(e.target.files[0]));
                console.log(e.target.files[0]);
                setUpdatedProduct({ ...updatedProduct, binaryImage: reader.result, image: Date.now() + e.target.files[0].name });
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
        if (updatedProduct.laptopName === null || updatedProduct.laptopName === undefined || updatedProduct.laptopName === '') {
            errorMessage.name = 'Tên không được trống';
            error1.name = true;
            flag = true;
        } else {
            error1.name = false;
        }

        if (updatedProduct?.brandId === undefined || updatedProduct?.brandId === null) {
            errorMessage.brand = 'Thương hiệu không được trống';
            error1.brand = true;
            flag = true;
        } else {
            error1.brand = false;
        }
        if (updatedProduct?.cpuId === undefined || updatedProduct?.cpuId === null) {
            errorMessage.cpu = 'CPU không được trống';
            error1.cpu = true;
            flag = true;
        } else {
            error1.cpu = false;
        }
        if (updatedProduct?.gpuId === undefined || updatedProduct?.gpuId === null) {
            errorMessage.gpu = 'GPU không được trống';
            error1.gpu = true;
            flag = true;
        } else {
            error1.cpu = false;
        }

        if (updatedProduct.ram === undefined || updatedProduct.ram === null || updatedProduct.ram === '') {
            errorMessage.ram = 'Ram không được trống';
            error1.ram = true;
            flag = true;
        } else if (updatedProduct.ram > 32) {
            errorMessage.ram = 'Ram phải nhỏ hơn hoặc bằng 32';
            error1.ram = true;
            flag = true;
        } else if (updatedProduct.ram <= 0) {
            errorMessage.ram = 'Ram phải lớn hơn 0';
            error1.ram = true;
            flag = true;
        }
        else {
            error1.ram = false;
        }
        if (updatedProduct.hardDrive === undefined || updatedProduct.hardDrive === null || updatedProduct.hardDrive === '') {
            errorMessage.hardDrive = 'Dung lượng ổ cứng không được trống';
            error1.hardDrive = true;
            flag = true;
        } else if (updatedProduct.hardDrive > 2048) {
            errorMessage.hardDrive = 'Dung lượng ổ cứng phải nhỏ hơn hoặc bằng 2048';
            error1.hardDrive = true;
            flag = true;
        } else if (updatedProduct.hardDrive <= 0) {
            errorMessage.hardDrive = 'Dung lượng ổ cứng phải lớn hơn 0';
            error1.hardDrive = true;
            flag = true;
        } else {
            error1.hardDrive = false;
        }

        if (updatedProduct.wideScreen === undefined || updatedProduct.wideScreen === null || updatedProduct.wideScreen === '') {
            errorMessage.wideScreen = 'Độ rộng màn hình không được trống';
            error1.wideScreen = true;
            flag = true;
        } else if (updatedProduct.wideScreen > 17.3) {
            errorMessage.wideScreen = 'Độ rộng màn hình phải nhỏ hơn hoặc bằng 17.3';
            error1.wideScreen = true;
            flag = true;
        } else if (updatedProduct.wideScreen <= 0) {
            errorMessage.wideScreen = 'Độ rộng màn hình phải lớn hơn 0';
            error1.wideScreen = true;
            flag = true;
        } else {
            error1.wideScreen = false;
        }
        if (updatedProduct.weight === undefined || updatedProduct.weight === null || updatedProduct.weight === '') {
            errorMessage.weight = 'Cân nặng không được trống';
            error1.weight = true;
            flag = true;
        } else if (updatedProduct.weight > 3.2) {
            errorMessage.weight = 'Cân nặng phải nhỏ hơn hoặc bằng 3.2';
            error1.weight = true;
            flag = true;
        } else if (updatedProduct.weight <= 0) {
            errorMessage.weight = 'Cân nặng phải lớn hơn 0';
            error1.weight = true;
            flag = true;
        } else {
            error1.weight = false;
        }

        
        if (updatedProduct.price === undefined || updatedProduct.price === 0 || updatedProduct.price === null || updatedProduct.price === '') {
            errorMessage.price = 'Giá sản phẩm không được trống';
            error1.price = true;
            flag = true;
        } else if (updatedProduct.price < 0) {
            errorMessage.price = 'Giá sản phẩm phải lớn hơn 0';
            error1.price = true;
            flag = true;
        } else if (updatedProduct.price > 129990001) {
            errorMessage.price = 'Giá sản phẩm phải nhỏ hơn hoặc bằng 129990001';
            error1.price = true;
            flag = true;
        } else {
            error1.price = false;
        }

        if (updatedProduct.image === undefined || updatedProduct.image === null || updatedProduct.image === '') {
            errorMessage.image = 'Hình ảnh không được trống';
            error1.image = true;
            flag = true;
        } else {
            error1.image = false;
        }

        if (updatedProduct.data === undefined || updatedProduct.data === null || updatedProduct.data === '') {
            errorMessage.data = 'Bộ dữ liệu huấn luyện không được trống';
            error1.data = true;
            flag = true;
        } else {
            error1.data = false;
        }
        setMessageError(errorMessage);
        setError(error1);
        return flag;
    }
    const postUpdateProduct = () => {
        console.log(updatedProduct)
        Axios.put("laptop/"+laptopId, updatedProduct)
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
            postUpdateProduct();
        }
    }, [messageError])

    const handleCreate = () => {
        valid();
        setSubmit(true);
    }
    useEffect(() => {
        Axios.get(`laptop/`+ laptopId)
            .then(res => {
                setProduct(res.data);
                console.log(res.data);
                setUpdatedProduct({
                    ...updatedProduct,
                    laptopName: res.data.laptopName,
                    brandName: res.data.brand.brandName,
                    brandId: res.data.brand.brandId,
                    cpuName: res.data.cpu.cpuName,
                    cpuId: res.data.cpu.cpuId,
                    gpuName: res.data.gpu.gpuName,
                    gpuId: res.data.gpu.gpuId,
                    ram: res.data.ram,
                    hardDrive: res.data.hardDrive,
                    price: res.data.price,
                    weight: res.data.weight,
                    wideScreen: res.data.wideScreen,
                    image: res.data.image
                })

            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`cpu`)
            .then(res => {
                setLstCpu(res.data);
                console.log(res.data);

            }).catch((error) => {
                console.log(error);

            })
    }, [])
    useEffect(() => {
        Axios.get(`brand`)
            .then(res => {
                setBrands(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    useEffect(() => {
        Axios.get(`gpu`)
            .then(res => {
                setLstGpu(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])
    
    const filterCpu = () => {

        if (updatedProduct.cpu !== null && updatedProduct.cpu !== undefined) {
            for (var i in lstCpu) {
                if (updatedProduct.cpu.id === lstCpu[i].id) {
                    return lstCpu[i];
                }
            }
        }
        return null;
    }
    const filterGpu = () => {

        if (updatedProduct.gpu !== null && updatedProduct.gpu !== undefined) {
            for (var i in lstGpu) {
                if (updatedProduct.gpu.id === lstGpu[i].id) {
                    return lstGpu[i];
                }
            }
        }
        return null;
    }
    const filterBrand = () => {
        if (updatedProduct.brand !== null && updatedProduct.brand !== undefined) {
            for (var i in brands) {
                if (updatedProduct.brand.id === brands[i].id) {
                    return brands[i];
                }
            }
        }
        return null;
    }
    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'laptopName') {
            setUpdatedProduct({ ...updatedProduct, [name]: value });
        } else {
            if (!isNaN(value)) {
                setUpdatedProduct({ ...updatedProduct, [name]: value });
            }
        }
    }
    return (
        <div className="container">
            <div className="updateClothesContainer">
                <div className="header">
                    <h4  color="error">
                        {'Cập nhật laptop'}
                    </h4>
                    <hr />
                </div>
                <div className="main">
                    <div className="left">
                        <div className="container-input">
                            <TextField sx={{ width: '100%' }}
                                onChange={handleChange}
                                error={error.name}
                                value={`${updatedProduct.laptopName ? updatedProduct.laptopName : ''}`}
                                label={'Nhập tên sản phẩm *'}
                                name="laptopName"  color="error"/>
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
                                getOptionLabel={(option) => option.brandName}
                                onChange={(event: any, newInputValue: any) => {
                                    setUpdatedProduct({ ...updatedProduct, brandId: newInputValue.brandId+'' });
                                }}
                                defaultValue={updatedProduct.brandName}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.brand}
                                    label="Chọn thương hiệu *"  color="error"/>}
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
                                getOptionLabel={(option) => option.cpuName}
                                onChange={(event: any, newInputValue: any) => {
                                    setUpdatedProduct({ ...updatedProduct, cpuId: newInputValue.cpuId+'' });
                                }}
                                defaultValue={product.cpu}
                                autoSelect = {true}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.cpu}
                                    label="Chọn CPU *"  defaultValue = {updatedProduct.cpuName}  color="error"/>}
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
                                getOptionLabel={(option) => option.gpuName}
                                onChange={(event: any, newInputValue: any) => {
                                    setUpdatedProduct({ ...updatedProduct, gpuId: newInputValue.gpuId+'' });
                                }}
                                defaultValue={updatedProduct.gpuName}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.cpu}
                                    label="Chọn GPU *"  color="error"/>}
                            />
                            {error.cpu && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.cpu}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="container-input">
                            <Table>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <TextField
                                            name="ram"
                                            value={`${updatedProduct.ram ? updatedProduct.ram : ''}`}
                                            onChange={handleChange}
                                            label={'Nhập RAM (GB) *'}
                                            type={'text'}
                                            error={error.ram} color="error"
                                        />
                                        {error.ram && <FormControl error variant="standard">
                                            <FormHelperText id="component-error-text">{messageError.ram}</FormHelperText>
                                        </FormControl>}
                                    </td>
                                    <td style={{ textAlign: 'right', width: "50%" }}>
                                        <TextField
                                            name="hardDrive"
                                            value={`${updatedProduct.hardDrive ? updatedProduct.hardDrive : ''}`}
                                            onChange={handleChange}
                                            label={'Nhập ổ cứng (GB) *'}
                                            type={'text'}
                                            error={error.hardDrive} color="error"
                                        />
                                        {error.hardDrive && <FormControl error variant="standard">
                                            <FormHelperText id="component-error-text">{messageError.hardDrive}</FormHelperText>
                                        </FormControl>}
                                    </td>
                                </tr>
                            </Table>
                        </div>
                        <div className="container-input">
                            <TextField
                                name="wideScreen"
                                value={`${updatedProduct.wideScreen ? updatedProduct.wideScreen : ''}`}
                                onChange={handleChange}
                                label={'Nhập độ rộng màn hình (inch) *'}
                                type={'text'}
                                error={error.wideScreen} color="error"
                            />
                            {error.wideScreen && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.wideScreen}</FormHelperText>
                            </FormControl>}

                        </div>
                        <div className="container-input">
                            <TextField
                                name="weight"
                                value={`${updatedProduct.weight ? updatedProduct.weight : ''}`}
                                onChange={handleChange}
                                label={'Nhập cân nặng (KG) *'}
                                type={'text'}
                                error={error.weight} color="error"
                            />
                            {error.weight && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.weight}</FormHelperText>
                            </FormControl>}

                        </div>
                        <div className="container-input">
                            <TextField
                                name="price"
                                value={`${updatedProduct.price ? updatedProduct.price : ""}`}
                                onChange={handleChange}
                                label={'Nhập giá sản phẩm (VND)*'}
                                type={'text'}
                                error={error.price} color="error"
                            />
                            {error.price && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.price}</FormHelperText>
                            </FormControl>}

                        </div>

                        <div className="container-input">
                            <Autocomplete
                                disablePortal
                                id="data"
                                options={option}
                                //value={filterCpu()}
                                getOptionLabel={(option) => option.label}
                                onChange={(event: any, newInputValue: any) => {
                                    setUpdatedProduct({ ...updatedProduct, data: newInputValue.value });
                                }}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    error={error.data}
                                    label="Chọn bộ dữ liệu huấn luyện *"  color="error"/>}
                            />
                            {error.data && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.data}</FormHelperText>
                            </FormControl>}
                        </div>
                    </div>
                    <div className="right">
                        <div className="imageContainer">
                            <div className="image">
                                {<img style={{ borderColor: `${error.image ? 'red' : "black"}` }} src={updatedProduct.image ? `http://localhost:8080/image/${updatedProduct.image}` : require('../../image/frame2.png')} />}
                            </div>
                            {error.image && <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError.image}</FormHelperText>
                            </FormControl>}
                        </div>
                        <div className="btnContainer">
                            <Button variant="outlined" component="label" color="error">
                            Chọn ảnh
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
                    <Button sx={{ width: '150px' }} variant="outlined" color="error" onClick={handleCancel}>Hủy</Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button sx={{ width: '200px' }} variant="contained" color="error" onClick={handleCreate}>Cập nhật</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;