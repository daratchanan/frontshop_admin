import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles({
   underline: {
      "&&&:before": {
         borderBottom: "none"
      },
      "&&:after": {
         borderBottom: "none"
      }
   }
});


export default function ProductItem({ product, fetchProducts }) {
   const classes = useStyles();

   const [name, setName] = useState(product.name);
   const [description, setDescription] = useState(product.description);
   const [price, setPrice] = useState(product.price);
   const [productType, setProductType] = useState(product.productType_id);

   const [isDisable, setIsDisable] = useState(true);

   const handleEdit = () => {
      setIsDisable(false)
   }

   const handleName = (event) => {
      setName(event.target.value)
   };

   const handleDescriptione = (event) => {
      setDescription(event.target.value)
   };

   const handlePrice = (event) => {
      setPrice(event.target.value)
   };

   const handleProductType = (event) => {
      setProductType(event.target.value)
   };

   const onUpdate = (id) => {
      const data = { name, description, price }
      axios.put(`http://localhost:8000/products/${id}`, data)
         .then(res => {
            alert("Update success.")
            fetchProducts();
            setIsDisable(true);
         })
         .catch(err => {
            console.log(err);
         })
   }

   const deleteProduct = (id) => {
      axios.delete(`http://localhost:8000/products/${id}`)
         .then(res => {
            alert("Product was deleted.")
            fetchProducts();
         })
         .catch(err => {
            console.log(err);
         })
   }

   return (
      <TableRow key={product.id}>
         <TableCell component="th" scope="product">
            <img src={product.img} alt="productImg" />
         </TableCell>
         <TableCell align="left" style={{ width: "200px" }}>
            <TextField
               disabled={isDisable}
               id={`name-${product.id}`}
               multiline
               rows={4}
               InputProps={{ classes }}
               value={name}
               onChange={handleName}
            />
         </TableCell>
         <TableCell align="left" style={{ width: "200px" }}>
            <TextField
               disabled={isDisable}
               id={`description-${product.id}`}
               multiline
               InputProps={{ classes }}
               value={description}
               onChange={handleDescriptione}
            />
         </TableCell>
         <TableCell >
            <TextField
               disabled={isDisable}
               id={`price-${product.id}`}
               InputProps={{ classes }}
               //style={{textAlign:"center"}}
               value={price}
               onChange={handlePrice}
            />
         </TableCell>
         <TableCell align="right">
            <TextField
               disabled={isDisable}
               id={`productType-${product.id}`}
               InputProps={{ classes }}
               value={productType}
               onChange={handleProductType}
            />
         </TableCell>
         <TableCell align="right" style={{ width: "100px" }}>
            {isDisable ?
               <IconButton
                  aria-label="edit"
                  onClick={handleEdit}
               >
                  <EditIcon style={{ color: "#00e676" }} />
               </IconButton>
               :
               <IconButton onClick={() => onUpdate(product.id)}>
                  <SaveIcon style={{ color: "#1565c0" }} />
               </IconButton>
            }
            <IconButton
               aria-label="delete"
               onClick={() => deleteProduct(product.id)}
            >
               <DeleteIcon style={{ color: "#ff1744" }} />
            </IconButton>
         </TableCell>
      </TableRow>
   )
}
