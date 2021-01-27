import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import ProductItem from './ProductItem';

const useStyles = makeStyles(theme => ({
   table: {
      minWidth: 650,
   },
   productListText: {
      textAlign: "center",
      marginTop: theme.spacing(3)
   }
}));

export default function ProductList() {
   const classes = useStyles();

   const [productItems, setProductItems] = useState([]);

   const fetchProducts = () => {
      axios.get("http://localhost:8000/products")
         .then(res => {
            setProductItems(res.data.products);
         })
         .catch(err => {
            console.log(err);
         })
   };

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
                     <TableCell align="center">Product Name</TableCell>
                     <TableCell align="center">Description</TableCell>
                     <TableCell align="center">Price</TableCell>
                     <TableCell align="center">Product Type</TableCell>
                     <TableCell align="center"></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {productItems.map((product) => (
                     <ProductItem
                     key={product.id}
                     product={product}
                     fetchProducts={fetchProducts}
                     />

                     // ย้ายไปสร้าง component ใหม่
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </Container>
   );
};
