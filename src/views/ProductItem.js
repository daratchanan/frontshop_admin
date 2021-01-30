import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';


export default function ProductItem({ product, fetchProducts }) {

   const [name, setName] = useState(product.name);
   const [description, setDescription] = useState(product.description);
   const [price, setPrice] = useState(product.price);
   const [productType, setProductType] = useState(product.ProductType.name)

   const [isDisable, setIsDisable] = useState(true);

   const handleName = (event) => {
      setName(event.target.value)
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

   const onEdit = () => {
      setIsDisable(false)
   };

   const deleteProduct = (id) => {
      axios.delete(`http://localhost:8000/products/${id}`)
         .then(res => {
            alert("product was deleted");
            fetchProducts();
         })
         .catch(err => {
            console.log(err);
         })
   }

   const isDelete = (id) => {
      const input = window.confirm("Do you want to delete?")
      if (input) {
         deleteProduct(id);
      } 
   };

   const isConfirm = (id) => {
      const input = window.confirm("Do you want to save?")
      if (input) {
         onUpdate(id);
      } else {
         setName(product.name);
         setDescription(product.description);
         setPrice(product.price);
         setProductType(product.productType);
         setIsDisable(true);
      }
   }

   const onUpdate = async (id) => {
      const data = { name, description, price, productType }
      await axios
         .put(`http://localhost:8000/products/${id}`, data)
         .then(res => {
            alert("update product.");
            setIsDisable(true);
         })
         .catch(err => {
            console.log(err);
         })
   }


   return (

      <TableRow key={product.id}>
         <TableCell component="th" >
            <img src={product.img} alt="productImg" />
         </TableCell>

         <TableCell style={{ width: "300px" }} align="left">
            <TextField
               disabled={isDisable}
               id={`name-${product.id}`}
               value={name}
               onChange={handleName}
            />
         </TableCell>

         <TableCell style={{ width: "300px" }} align="left">
            <TextField
               disabled={isDisable}
               id={`description-${product.id}`}
               value={description}
               onChange={handleDescription}
            />
         </TableCell>

         <TableCell style={{ width: "100px" }} align="center">
            <TextField
               disabled={isDisable}
               id={`price-${product.id}`}
               value={price}
               onChange={handlePrice}
            />

         </TableCell>
         <TableCell style={{ width: "100px" }} align="center">
            <TextField
               disabled={isDisable}
               id={`Type-${product.id}`}
               value={productType}
               onChange={handleProductType}
            />
         </TableCell>
         <TableCell align="center" style={{ width: "150px" }}>
            {isDisable ?
               <IconButton
                  aria-label="edit"
                  onClick={onEdit}
               >
                  <EditIcon style={{ color: "#00c853" }} />
               </IconButton>
               :
               <IconButton
                  aria-label="save"
                  onClick={() => isConfirm(product.id)}
               >
                  <SaveIcon style={{ color: "#2196f3" }} />
               </IconButton>
            }
            <IconButton
               aria-label="delete"
               onClick={() => isDelete(product.id)}
               //onClick={() => deleteProduct(product.id)}
            >
               <DeleteIcon style={{ color: "#ff3d00" }} />
            </IconButton>
         </TableCell>
      </TableRow>
   )
}
