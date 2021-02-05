import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useEffect } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';

function Copyright() {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="https://material-ui.com/">
            Your Website
      </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

export default function InputProduct() {
   const classes = useStyles();

   const [productName, setProductName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [productType, setProductType] = useState("");
   const [uploadImg, setUploadImg] = useState({ open: false, files: [] });
   const [productList, setProductList] = useState([]);

   const handleProductName = (event) => {
      setProductName(event.target.value)
   };

   const handleDescription = (event) => {
      setDescription(event.target.value)
   };

   const handlePrice = (event) => {
      setPrice(event.target.value)
   };

   const handleProductType = (event) => {
      setProductType(event.target.value)
   };

   const handleClose = () => {
      setUploadImg({ open: false})
   };


   // const handleClose = () => {
   //    setSelectedFiles({ open: false });
   // }

   const handleSave = (files) => {
      //Saving files to state for further use and closing Modal.
      setUploadImg({ files, open: false });
   }

   const handleOpen = () => {
      console.log('open');
      setUploadImg({ open: true });
   }

   const fetchProductType = () => {
      axios.get("/products/allProductType")
         .then(res => {
            setProductList(res.data.productTypes);
         })
         .catch(err => {
            console.log(err);
         })
   };

   const onFinish = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("name", productName)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("productType_id", productType)
      //formData.append("image", uploadImg)
      formData.append('image', uploadImg.files[0]);
      await axios
         .post("/products", formData)
         .then(res => {
            alert("Add product success")
         })
         .catch(err => {
            alert("err")
         })
   };

   useEffect(() => {
      fetchProductType();
   }, [])

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Input Product
            </Typography>
            <form className={classes.form} noValidate onSubmit={onFinish}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        autoComplete="pname"
                        name="productName"
                        variant="outlined"
                        required
                        fullWidth
                        id="productName"
                        label="Product Name"
                        autoFocus
                        onChange={handleProductName}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="des"
                        onChange={handleDescription}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        onChange={handlePrice}

                     />
                  </Grid>
                  <Grid item xs={12}>
                     <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Product Type</InputLabel>
                        <Select
                           label="Product Type"
                           onChange={handleProductType}
                        >
                           {productList.map(type =>
                              <MenuItem value={type.id}>{type.name}</MenuItem>
                           )}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                     <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        onClick={handleOpen}
                     >
                        Upload Img
                        {/* <input
                           type="file"
                           hidden
                           onChange={handleUploadImg}
                        /> */}
                     </Button>
                  </Grid>
               </Grid>

               <DropzoneDialog
                  open={uploadImg.open}
                  onSave={handleSave}
                  acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={handleClose}
               />        

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  ADD PRODUCT
          </Button>

            </form>
         </div>
         <Box mt={5}>
            <Copyright />
         </Box>
      </Container>
   );
}