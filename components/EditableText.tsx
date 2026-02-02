
import React from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ value, onSave, isEditing, className = '', multiline = false }) => {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onSave(e.currentTarget.textContent || '')}
      className={`${className} outline-none border-b border-dashed border-gold/50 focus:border-gold focus:bg-gold/5 px-1 rounded transition-all cursor-text inline-block min-w-[20px]`}
    >
      {value}
    </span>
  );
};

export default EditableText;
