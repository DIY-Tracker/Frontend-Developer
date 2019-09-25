import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


const ProjectCard = props => {
  // console.log(props);
  const classes = useStyles();
  const { projectName, materials, steps, photoUrl, description } = props.project;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    // <div>
    //   <h1>{name}</h1>
    //   <img src={fileUrl} alt='Project Picture' />
    //   <ul>
    //     {materials && materials.map((material, index)=> (
    //       <li key={index}>{material}</li>
    //     ))}
    //   </ul> 
    //   <ul>
    //     {steps && steps.map((step, index) => (
    //       <li key={index}>{step}</li>
    //     ))}
    //   </ul> 
    // </div>    
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={photoUrl}
        // projectName={projectName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {projectName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <div>
        <CardContent>
          <Typography paragraph>Materials</Typography>
          {materials.map((material, index) => {
            return <Typography paragraph>{material}</Typography>;
          })}
          <Typography paragraph>Method:</Typography>
          {steps.map((step, index) => {
            return <Typography paragraph>{step}</Typography>;
          })}
        </CardContent>
      </div>  
      </Collapse>
    </Card>
  )

}

export default ProjectCard;
