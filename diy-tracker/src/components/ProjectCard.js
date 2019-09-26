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
import Button from '@material-ui/core/Button';

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
  button: {
    margin: theme.spacing(1),
  }
}));


const ProjectCard = props => {
  // console.log(props);
  const classes = useStyles();
  const { projectName, materials, steps, photoUrl, description } = props.project;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showViewProjectButton = (props.isSignedIn) || false;

  return (    
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={photoUrl}
        title={projectName}
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
          <Typography paragraph>Materials:</Typography>
          {materials.map((material, index) => {
            return <Typography paragraph key={index}>{material}</Typography>;
          })}
          <Typography paragraph>Steps:</Typography>
          {steps.map((step, index) => {
            return <Typography paragraph key={index}>{step}</Typography>;
          })}
        {showViewProjectButton && <Button className={classes.button} variant='contained' color='primary' 
          onClick= { () => window.location =`/projects/project/${props.project.projectId}`}>
              View Project
        </Button>}
        </CardContent>
      </div>  
      </Collapse>
    </Card>
  )

}

export default ProjectCard;
