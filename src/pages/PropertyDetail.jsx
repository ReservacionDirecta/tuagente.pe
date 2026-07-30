import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoArrowBack, IoBed, IoWater, IoCar, IoResize, IoLocation, IoCall, IoMail, IoLogoWhatsapp } from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import AppointmentModal from '../components/ui/AppointmentModal';
import { contactInfo } from '../utils/constants';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setProperty(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Propiedad no encontrada</h1>
        <Link to="/propiedades">
          <Button variant="primary">Volver a propiedades</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${property.operation} ${property.category} - ${property.name} | TUAGENTE.PE`}
        description={property.description}
      />

      <main className="pt-20">
        <Container className="py-4">
          <Link
            to="/propiedades"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors"
          >
            <IoArrowBack className="w-5 h-5 mr-2" />
            Volver a propiedades
          </Link>
        </Container>

        <section className="bg-gray-100">
          <Container className="py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={property.images[selectedImage]}
                  alt={property.name}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.name} - ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="primary">{property.category}</Badge>
                <Badge variant="secondary">{property.operation}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {property.operation} {property.category} - {property.name}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <IoLocation className="w-5 h-5 mr-2" />
                <span>{property.location.address}, {property.location.district}, {property.location.city}</span>
              </div>

              <div className="text-4xl font-bold text-primary mb-8">
                {property.priceDisplay}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <IoBed className="w-8 h-8 mx-auto text-primary mb-2" />
                  <span className="block text-2xl font-bold text-gray-900">
                    {property.features.bedrooms}
                  </span>
                  <span className="text-gray-600">Habitaciones</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <IoWater className="w-8 h-8 mx-auto text-primary mb-2" />
                  <span className="block text-2xl font-bold text-gray-900">
                    {property.features.bathrooms}
                  </span>
                  <span className="text-gray-600">Baños</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <IoResize className="w-8 h-8 mx-auto text-primary mb-2" />
                  <span className="block text-2xl font-bold text-gray-900">
                    {property.features.area}
                  </span>
                  <span className="text-gray-600">m²</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <IoCar className="w-8 h-8 mx-auto text-primary mb-2" />
                  <span className="block text-2xl font-bold text-gray-900">
                    {property.features.parking}
                  </span>
                  <span className="text-gray-600">Estacionamiento</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación</h2>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    title={`Mapa de ${property.name}`}
                    width="100%"
                    height="320"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${property.location.address}, ${property.location.district}, ${property.location.city}, Perú`
                    )}&output=embed`}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Ubicación aproximada. La dirección exacta se proporciona al agendar una visita.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contactar Agente</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      CM
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Carlos Mendoza</p>
                      <p className="text-sm text-gray-600">Asesor Inmobiliario</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center text-gray-700 hover:text-primary transition-colors"
                  >
                    <IoCall className="w-5 h-5 mr-3" />
                    {contactInfo.phone}
                  </a>

                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center text-gray-700 hover:text-primary transition-colors"
                  >
                    <IoMail className="w-5 h-5 mr-3" />
                    {contactInfo.email}
                  </a>

                  <a
                    href={contactInfo.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-primary transition-colors"
                  >
                    <IoLogoWhatsapp className="w-5 h-5 mr-3" />
                    WhatsApp
                  </a>
                </div>

                <Button variant="secondary" className="w-full mb-3" onClick={() => setShowAppointment(true)}>
                  Agendar Visita
                </Button>

                <a
                  href={`${contactInfo.social.whatsapp}?text=${encodeURIComponent(`Hola, me interesa la propiedad "${property.name}". Quisiera más información.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium py-3 rounded-lg transition-colors mb-3"
                >
                  WhatsApp
                </a>

                <Button variant="outline" className="w-full">
                  Solicitar Información
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <AppointmentModal
        isOpen={showAppointment}
        onClose={() => setShowAppointment(false)}
        propertyId={property.id}
        propertyName={property.name}
      />
    </>
  );
};

export default PropertyDetail;
