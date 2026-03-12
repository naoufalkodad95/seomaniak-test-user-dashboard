import React, { useState, useEffect } from 'react';

function EditUserModal({ show, onClose, utilisateur, onModifier }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    date: '',
    sexe: '',
    langues: [],
    niveauEtudes: '',
    email: ''
  });

  const languesDisponibles = [
    { value: 'Français', flag: '🇫🇷' },
    { value: 'Anglais', flag: '🇬🇧' },
    { value: 'Espagnol', flag: '🇪🇸' },
    { value: 'Allemand', flag: '🇩🇪' },
    { value: 'Italien', flag: '🇮🇹' },
    { value: 'Arabe', flag: '🇸🇦' },
    { value: 'Chinois', flag: '🇨🇳' },
    { value: 'Japonais', flag: '🇯🇵' }
  ];

  useEffect(() => {
    if (utilisateur) {
      setFormData({
        nom: utilisateur.nom || '',
        prenom: utilisateur.prenom || '',
        date: utilisateur.date || '',
        sexe: utilisateur.sexe || '',
        langues: utilisateur.langues || [],
        niveauEtudes: utilisateur.niveauEtudes || '',
        email: utilisateur.email || ''
      });
    }
  }, [utilisateur]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLangueChange = (e) => {
    const valeur = e.target.value;
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        langues: [...prev.langues, valeur]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        langues: prev.langues.filter(langue => langue !== valeur)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.date || !formData.sexe || 
        formData.langues.length === 0 || !formData.niveauEtudes || !formData.email) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    onModifier(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h5>
            <i className="bi bi-pencil-square me-2"></i>
            Modifier l'utilisateur
          </h5>
          <button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Nom
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="nom"
                  value={formData.nom} 
                  onChange={handleChange}
                  placeholder="Nom"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Prénom
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="prenom"
                  value={formData.prenom} 
                  onChange={handleChange}
                  placeholder="Prénom"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-calendar-heart me-2"></i>
                Date de naissance
              </label>
              <input 
                type="date" 
                className="form-control" 
                name="date"
                value={formData.date} 
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-gender-ambiguous me-2"></i>
                Sexe
              </label>
              <div className="radio-group">
                {['Homme', 'Femme', 'Autre'].map((option) => (
                  <div className="radio-option" key={option}>
                    <input 
                      type="radio" 
                      name="sexe" 
                      id={`edit-sexe-${option}`}
                      value={option}
                      checked={formData.sexe === option}
                      onChange={handleChange}
                    />
                    <label htmlFor={`edit-sexe-${option}`}>
                      <i className={`bi ${
                        option === 'Homme' ? 'bi-gender-male' :
                        option === 'Femme' ? 'bi-gender-female' : 'bi-gender-trans'
                      }`}></i>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-translate me-2"></i>
                Langues parlées
              </label>
              <div className="checkbox-group">
                {languesDisponibles.map((langue) => (
                  <div className="checkbox-item" key={langue.value}>
                    <input 
                      type="checkbox" 
                      id={`edit-langue-${langue.value}`}
                      value={langue.value}
                      checked={formData.langues.includes(langue.value)}
                      onChange={handleLangueChange}
                    />
                    <label htmlFor={`edit-langue-${langue.value}`}>
                      {langue.flag} {langue.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-mortarboard me-2"></i>
                Niveau d'études
              </label>
              <select 
                className="form-select" 
                name="niveauEtudes"
                value={formData.niveauEtudes} 
                onChange={handleChange}
              >
                <option value="">Sélectionner...</option>
                <option value="Sans diplôme">📝 Sans diplôme</option>
                <option value="CAP/BEP">🔧 CAP/BEP</option>
                <option value="Baccalauréat">📗 Baccalauréat</option>
                <option value="BTS/DUT">📙 BTS/DUT</option>
                <option value="Licence">📕 Licence</option>
                <option value="Master">📔 Master</option>
                <option value="Doctorat">🎓 Doctorat</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email
              </label>
              <input 
                type="email" 
                className="form-control" 
                name="email"
                value={formData.email} 
                onChange={handleChange}
                placeholder="exemple@email.com"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-custom btn-outline-custom" onClick={onClose}>
              <i className="bi bi-x-circle me-2"></i>
              Annuler
            </button>
            <button type="submit" className="btn-custom btn-primary-custom">
              <i className="bi bi-check-circle me-2"></i>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;