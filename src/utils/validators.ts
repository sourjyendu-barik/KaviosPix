export const validateRequired = (
  value: string,
  fieldName: string,
): string | null => {
  return value.trim() ? null : `${fieldName} is required`;
};

export const validateMinLength = (
  value: string,
  min: number,
  fieldName: string,
): string | null => {
  return value.trim().length >= min
    ? null
    : `${fieldName} must be at least ${min} characters`;
};

export const validateMaxLength = (
  value: string,
  max: number,
  fieldName: string,
): string | null => {
  return value.trim().length <= max
    ? null
    : `${fieldName} cannot exceed ${max} characters`;
};

export const validateSpecialCharacters = (
  value: string,
  fieldName: string,
): string | null => {
  const regex = /^[A-Za-z0-9 ]+$/;

  if (!regex.test(value.trim())) {
    return `${fieldName} can only contain letters, numbers, and spaces`;
  }

  return null;
};

export const validateAlbumName = (name: string): string | null => {
  return (
    validateRequired(name, "Name") ||
    validateMinLength(name, 3, "Name") ||
    validateMaxLength(name, 50, "Name") ||
    validateSpecialCharacters(name, "Name")
  );
};

export const validateDescription = (description: string): string | null => {
  return validateMaxLength(description, 70, "Description");
};

// File validators
export const validateImageRequired = (file: File | null): string | null => {
  return file ? null : "Image is required";
};

// Extensions that are treated as JPEG by the browser's MIME sniffing
// but are not actually plain jpg/png/gif and should be rejected.
const MISLABELED_JPEG_EXTENSIONS = ["jfif", "pjpeg", "pjp"];

export const validateFileType = (
  file: File | null,
  allowedTypes: string[],
): string | null => {
  if (!file) return null;

  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (MISLABELED_JPEG_EXTENSIONS.includes(extension)) {
    return "Only JPG, PNG and GIF images are allowed";
  }

  return allowedTypes.includes(file.type)
    ? null
    : "Only JPG, PNG and GIF images are allowed";
};

export const validateFileSize = (
  file: File | null,
  maxSizeInMB: number,
): string | null => {
  if (!file) return null;

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  return file.size <= maxSizeInBytes
    ? null
    : `Image size cannot exceed ${maxSizeInMB} MB`;
};

// Person validator
export const validatePerson = (person: string): string | null => {
  if (!person.trim()) return null;

  return (
    validateMinLength(person, 3, "Person") ||
    validateMaxLength(person, 50, "Person") ||
    validateSpecialCharacters(person, "Person")
  );
};

// Tags validator
export const validateTags = (tags: string): string | null => {
  if (!tags.trim()) return null;

  return (
    validateMaxLength(tags, 100, "Tags") ||
    validateSpecialCharacters(tags.replace(/,/g, ""), "Tags")
  );
};

// Complete image validator
export const validateImage = (file: File | null): string | null => {
  return (
    validateImageRequired(file) ||
    validateFileType(file, [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ]) ||
    validateFileSize(file, 5)
  );
};
