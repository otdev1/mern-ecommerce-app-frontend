import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { API_URL } from "../constants/apiURL";

function PaypalButton(props) {
    const [sdkReady, setSdkReady] = useState(false);

    const addPaypalSdk = async () => {
        const result = await axios.get( API_URL + '/api/config/paypal'); //access Paypal client id
        const clientID = result.data;
        const script = document.createElement('script'); //creation of HTML <script> element
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
        script.async = true;

        script.onload = () => {
            setSdkReady(true);
            //changes the state of sdkReady after the paypal sdk script has loaded
        }

        document.body.appendChild(script);
    }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount
        }
      }
    ]//purchase_units is an object array
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details)) //call onSuccess function of parent component
    .catch(err => console.log(err));

  /*Load Paypal script */
  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>
  }

  const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

  return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
    onApprove={(data, actions) => onApprove(data, actions)} />
}

export default PaypalButton;