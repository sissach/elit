
import React, { useState, useRef } from 'react';

interface UserUploadProps {
  onImageUpload: (base64: string) => void;
}

const UserUpload: React.FC<UserUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert("Veuillez sélectionner une image valide.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const confirmUpload = () => {
    if (preview) {
      onImageUpload(preview);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h3 className="font-display italic text-3xl mb-2">Partagez votre style</h3>
        <p className="text-gray-400 text-sm font-light">Montrez votre nouvelle coupe à la communauté Elit Coiffure.</p>
      </div>

      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          className={`
            relative cursor-pointer group
            border-2 border-dashed rounded-[2.5rem] p-12 
            flex flex-col items-center justify-center gap-4
            transition-all duration-500
            ${isDragging ? 'border-gold bg-gold/5 scale-[0.98]' : 'border-gray-200 bg-white hover:border-gold hover:bg-gray-50'}
          `}
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-gold text-3xl">add_a_photo</span>
          </div>
          
          <div className="text-center">
            <p className="font-bold text-sm text-charcoal mb-1">Cliquez ou déposez votre photo</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Format requis : <span className="text-gold">JPG, PNG, JPEG</span>
            </p>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            accept="image/png, image/jpeg, image/jpg" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-video shadow-2xl border-4 border-white">
            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
            <button 
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 bg-charcoal/50 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button 
              onClick={confirmUpload}
              className="flex-1 bg-gold text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-gold/20 hover:bg-charcoal transition-all active:scale-95"
            >
              Publier dans la galerie
            </button>
            <button 
              onClick={() => setPreview(null)}
              className="px-8 border border-gray-200 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserUpload;
