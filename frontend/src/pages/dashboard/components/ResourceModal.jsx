import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CustomModal from "../../../components/CustomModal";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { apiResource } from "../../../services/models/resourceModal";

const ResourceModal = ({
  open,
  setOpen,
  fetchResource,
  loading,
  setLoading,
}) => {
  const { userId, projectId } = useParams();

  const [inputs, setInputs] = useState({
    name: "",
    number: 1,
    userId: userId,
    projectId: projectId,
  });

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [schema, setSchema] = useState([]);

  const handleSchema = (id, label, field) => {
    const newArr = schema?.map((obj) => {
      if (obj.id === id) {
        return { ...obj, label: label, field: field };
      }
      return obj;
    });
    setSchema(newArr);
    // setSchema([ ...schema, [e.target.name]: e.target.value ]);
  };

  const addSchema = () => {
    setSchema([...schema, { id: Date.now(), label: "", field: "" }]);
  };

  const deleteSchema = (id) => {
    setSchema(schema.filter((item) => item.id !== id));
  };

  const createProject = () => {
    setLoading(true);
    toast("Adding");

    const body = {
      name: inputs.name,
      number: parseInt(inputs.number),
      userId: userId,
      projectId: projectId,
      schema: schema,
    };

    apiResource.post(body).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        toast.success("Added Successfully");
        fetchResource();
        setSchema([]);
        setInputs({
          name: "",
          number: 1,
          userId: userId,
          projectId: projectId,
        });
        setLoading(false);
        setOpen(false);
      } else {
        setOpen(false);
        toast.error("Error");
      }
    });
  };

  return (
    <CustomModal open={open} setOpen={setOpen} width={600}>
      <Typography variant="h5" component="h2" color="primary" sx={{ mb: 2 }}>
        New Resource
      </Typography>
      <TextField
        label="Resource name"
        sx={{ mb: 2 }}
        size="small"
        fullWidth
        name="name"
        value={inputs.name}
        onChange={(e) => handleInputs(e)}
      />
      <TextField
        label="Number of Objects"
        sx={{ mb: 2 }}
        size="small"
        fullWidth
        name="number"
        value={inputs.number}
        onChange={(e) => handleInputs(e)}
      />

      <Stack direction="row" spacing={1}>
        <TextField value="id" sx={{ mb: 2 }} size="small" disabled />
        <TextField value="uuid" sx={{ mb: 2 }} size="small" disabled />
      </Stack>

      {schema?.map((item, idx) => (
        <Stack direction="row" spacing={1} key={item.id}>
          <TextField
            sx={{ mb: 2 }}
            size="small"
            value={item.label}
            label="Label"
            onChange={(e) => handleSchema(item.id, e.target.value, item.field)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Field</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ mb: 2 }}
              size="small"
              label="Field"
              value={item.field}
              onChange={(e) =>
                handleSchema(item.id, item.label, e.target.value)
              }
            >
              {choices?.map((choice) => (
                <MenuItem value={choice} key={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteSchema(item.id)}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      ))}

      <Button onClick={addSchema} variant="contained" size="small">
        Add Resource
      </Button>

      <Stack direction="row" spacing={3} mt={2}>
        <Button variant="contained" size="small" onClick={createProject}>
          Create
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </Stack>

      {loading && (
        <Stack direction="column" spacing={3} mt={4}>
          <LinearProgress sx={{ mb: -2 }} />
          <Typography variant="p" component="p" color="primary" align="center">
            Generating Data...
          </Typography>
        </Stack>
      )}
    </CustomModal>
  );
};

export default ResourceModal;

export const choices = [
  "firstName",
  "lastName",
  "sex",
  "jobArea",
  "jobTitle",
  "avatar",
  "fashion",
  "product",
  "productDescription",
  "price",
  "productAdjective",
  "boolean",
  "past",
  "lines",
  "domainName",
  "imageUrl",
  "sentences",
  "chemicalElement",
  "unit",
  "hsl",
  "humanColor",
  "rgb",
  "genre",
  "songName",
  "amount",
  "bitcoinAddress",
  "creditCardCVV",
  "creditCardIssuer",
  "creditCardNumber",
  "currencyName",
  "currencySymbol",
  "ethereumAddress",
  "transactionDescription",
  "transactionType",
];
