import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { loader, MaterialButton, MaterialInput } from "../../components/MaterialUI";
import { Layout, message } from 'antd';

const { Content } = Layout;
/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");

  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    // console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    if (name === "" ||
      mobileNumber === "" ||
      pinCode === "" ||
      locality === "" ||
      address ==="" ||
      cityDistrictTown === "" ||
      state === "" ||
      addressType === ""
    ) {
      return (
        message.warning('Please fill the required')
      );
    }
    dispatch(addAddress(payload));
    setSubmitFlag(true);
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }

      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <>
        <Content style={{ padding: '1px 12px' }}>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="Pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="Locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
            </div>
          </div>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="City/District/Town"
                value={cityDistrictTown}
                onChange={(e) => setCityDistrictTown(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="Landmark (Optional)"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="Alternate Phone (Optional)"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label>Address Type</label>
            <div className="flexRow" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div>
                <input
                  type="radio"
                  onClick={() => setAddressType("home")}
                  name="addressType"
                  value="home"
                />
                <span>Home</span>
              </div>
              <div>
                <input
                  type="radio"
                  onClick={() => setAddressType("work")}
                  name="addressType"
                  value="work"
                />
                <span>Work</span>
              </div>
            </div>
          </div>
          <div className="flexRow">
            <MaterialButton
              title="SAVE AND DELIVER HERE"
              loading={user.loading && loader()}
              onClick={onAddressSubmit}
              style={{
                width: "250px",
                margin: "20px 0",
              }}
            />
          </div>
        </Content>
      </>
    );
  };

  if (props.withoutLayout) {
    return (
      <Content>
        <div>{renderAddressForm()}</div>
      </Content>
    );
  }

  return (
    <Layout className="site-layout-background" style={{ padding: '12px 0' }}>
      <div className="checkoutStep" style={{ background: "#f5faff" }}>
        <Content>
          <div className={`checkoutHeader`}>
            <div>
              <span className="stepNumber">+</span>
              <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
            </div>
          </div>
        </Content>
        <div
          style={{
            paddingBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          <Content>
            {renderAddressForm()}
          </Content>
        </div>
      </div>
    </Layout>
  );
};

export default AddressForm;
