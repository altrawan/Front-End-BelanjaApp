import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Code } from 'react-content-loader';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import jas from '../../assets/img/jas.jpg';
import { getMyCart } from '../../redux/actions/cart';
import { getMyAddress, createAddress } from '../../redux/actions/address';
import AddAddress from '../../components/modals/add-address';
import CardCheckout from '../../components/card/card-checkout';
import CardTotalPrice from '../../components/card/card-total-price';
import ModalsPayment from '../../components/modals/modals-payment';

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const myAddress = useSelector(state => state.myAddress);
  const myCart = useSelector(state => state.myCart);
  const [isPayment, setIsPayment] = useState(false);
  const [formAddress, setFormAddress] = useState({
    label: '',
    recipientName: '',
    recipientPhone: '',
    address: '',
    postalCode: '',
    city: '',
    isPrimary: 0
  });
  const [formTransaction, setFormTransaction] = useState({
    label: '',
    recipientName: '',
    recipientPhone: '',
    address: '',
    postalCode: '',
    city: '',
    is_primary: 0
  });
  const [payment, setPayment] = useState(3);

  const editAddress = item => {
    if (item) {
      setFormAddress({
        label: item.label,
        recipientName: item.recipient_name,
        recipent_name: item.recipient_phone,
        address: item.address,
        postalCode: item.postal_code,
        city: item.city,
        isPrimary: item.is_primary
      });
    }
  };

  const AddNewAddress = e => {
    e.preventDefault();
    if (
      !formAddress.label ||
      !formAddress.recipientName ||
      !formAddress.recipientPhone ||
      !formAddress.address ||
      !formAddress.postalCode ||
      !formAddress.city
    ) {
      Swal.fire('Failed!', 'All field must be filled', 'warning');
    } else {
      createAddress(formAddress)
        .then(() => {})
        .catch(err => {
          if (err.response.data.code === 422) {
            const { error } = err.response.data;
            error.map(item => toastify(item, 'error'));
          } else {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error'
            });
          }
        });
    }
  };

  useEffect(() => {
    dispatch(getMyAddress());
    dispatch(getMyCart());
  }, []);

  return (
    <div>
      <Head>
        <title>Blanja | Checkout</title>
        <meta name="" content="" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="p-6 pt-16 md:p-28 bg-white">
        <h1 className="mt-8 text-black text-3xl font-extrabold">Checkout</h1>

        <div className="md:flex">
          <div className="flex-auto md:w-2/5">
            <p className="mb-2 font-semibold">Shipping Address</p>
            {myAddress.isLoading ? (
              <Code />
            ) : myAddress.error === 'Addres Not Found' ? (
              <button>Add New Address</button>
            ) : myAddress.isError ? (
              <div>Error</div>
            ) : myAddress.data.length > 0 ? (
              myAddress.data.map((item, index) =>
                item.is_primary ? (
                  <div className="bg-white p-6 rounded-lg shadow-lg" key={index}>
                    <p className="font-bold text-black text-lg">{item.recipient_name}</p>
                    <p className="mt-2">
                      {`[${item.label}] ${item.address},  ${item.city}, ${item.postal_code}, (HP: ${item.recipient_phone})`}
                    </p>
                    <div className="mt-5">
                      <AddAddress myAddress={myAddress} />
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )
            ) : (
              <button>Add New Address</button>
            )}
            <CardCheckout image={jas} productName="Men's formal suit - Black" store="Zalora Cloth" price="$ 20.0" />
            <CardCheckout image={jas} productName="Men's formal suit - Black" store="Zalora Cloth" price="$ 20.0" />
          </div>
          <div className="flex-1 mt-4 md:mt-0 md:w-32 md:ml-8">
            <CardTotalPrice order="$ 40.0" delivery="$ 5.0" totalPrice="$ 45.0" onClick={() => setIsPayment(true)} />
          </div>
        </div>
      </div>
      {isPayment ? <ModalsPayment onClick={() => setIsPayment(false)} /> : null}
    </div>
  );
};

Checkout.layouts = 'MainLayout';
export default Checkout;
