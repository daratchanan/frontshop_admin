import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Typography } from '@material-ui/core';
import axios from 'axios';
import ProductItem from './ProductItem';


const useStyles = makeStyles((theme) => ({
   table: {
      minWidth: 650,
   },
   productListText: {
      marginTop: theme.spacing(3),
      textAlign: "center",
   },
   textHeader: {
      fontWeight: "bold",
      fontSize: "1rem"
   }
}));


export default function ProductList() {
   const classes = useStyles();

   const [productLists, setProductLists] = useState([]);

   const fetchProducts = async () => {
      await axios
         .get("/products/productlist")
         .then(res => {
            setProductLists(res.data.products);
         })
         .catch(err => {
            console.log(err);
         })
   }

   useEffect(() => {
      fetchProducts();
   }, [])

   return (
      <Container maxWidth="lg">
         <Typography variant="h3" gutterBottom className={classes.productListText}>
            Product List
         </Typography>
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell></TableCell>
                     <TableCell className={classes.textHeader} align="center">Product Name</TableCell>
                     <TableCell className={classes.textHeader} align="center">Description</TableCell>
                     <TableCell className={classes.textHeader} align="center">Price</TableCell>
                     <TableCell className={classes.textHeader} align="center">Product Type</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {productLists.map((product) => (
                     <ProductItem
                     key={product.id}
                     product={product}
                     fetchProducts={fetchProducts}
                     />
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Container>
   );
}
