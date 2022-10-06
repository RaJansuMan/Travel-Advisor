import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActions,
  Button,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import React from "react";

import useStyle from "./styles.js";

const PlaceDetails = ({ place, selected, refProp }) => {
  const classes = useStyle();

  if (selected)
    refProp?.current?.scrollIntoView({ behaviour: "smooth", block: "start" });

  return (
    <Card className={classes.container}>
      <CardMedia
        style={{ height: 250 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" gutterBottom>
            Price
          </Typography>
          <Typography variant="subtitle1">{place.price_level}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(place.rating)} readOnly />
          <Typography variant="subtitle1">
            out of {place.num_reviews} reviews
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>

        {place?.cuisine?.map(({ key, name }) => (
          <Chip key={key} size="small" label={name} className={classes.chip} />
        ))}

        {place.address && (
          <Typography variant="body2" className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography variant="body2" className={classes.spacing}>
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisor
        </Button>

        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
