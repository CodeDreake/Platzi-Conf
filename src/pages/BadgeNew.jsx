import React from 'react'
import './styles/BadgeNew.css'
// import Navbar from '../components/Navbar.jsx'
import Badge from '../components/Badge'
import BadgeForm from '../components/BadgeForm'
import header from '../images/platziconf-logo.svg'
import api from '../api'
import PageLoading from '../components/PageLoading'

class BadgeNew extends React.Component {
  state = {
    loading: false,//Representa el tiempo del envio de los datos, sera true cuando demos click en enviar
    error: null,//Comenzamos sin errores
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.setState({loading: true, error: null})

    try {
      await api.badges.create(this.state.form)
      this.setState({loading: false})

      this.props.history.push('/badges')
    }catch (error){
      this.setState({loading: false, error: error})
    }
  }

  render() {
    if (this.state.loading === true){
      return <PageLoading/>
    }


    return (
      <div>

        {/* <Navbar/> */}

        <div className="BadgeNew__hero">
          <img className="BadgeNew_hero-image img-fliud" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="rox" />
            <div className="BadgeT col-6">

              <Badge
                firtsName={this.state.form.firstName || 'FIRST_NAME'}//Condicional si el valor 1 no exite, pasa a mostrar el segundo valor en este caso FIRST NAME
                lastName={this.state.form.lastName || 'LAST_NAME'}
                email={this.state.form.email || 'EMAIL'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITTLE'}
                twitter={this.state.form.twitter || 'TWITTER'}
              />

            </div>

            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>

        </div>

      </div>
    );
  }
}

export default BadgeNew;
