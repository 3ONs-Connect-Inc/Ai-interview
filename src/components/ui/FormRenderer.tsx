import Input from "./Input";
import PhoneInput from "./PhoneInput";
import Checkbox from "./Checkbox";
import React from "react";
import CompanyNameSearch from "./CompanyNameSearch";

export type FieldConfig = {
  component: string;
  name?: string;
  label?: string | React.ReactNode;
  type?: string;
  placeholder?: string;
  onBlur?: string;
  refName?: string;
  wrapperClass?: string;
  groupId?: string;
  options?: { label: string; value: string }[];
};

interface FormRendererProps<TFormData extends Record<string, any>> {
  fields: FieldConfig[];
  formData: TFormData;
  errors: Partial<Record<string, string>>;
  setErrors: React.Dispatch<
    React.SetStateAction<Partial<Record<string, string>>>
  >;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  refs?: Record<string, any>;
  setFormData?: React.Dispatch<React.SetStateAction<TFormData>>;
  countries?: { name: string; code: string }[];
  handleRecaptcha?: (token: string | null) => void;
  theme?: "light" | "dark";
  showMap?: boolean;
  markerPosition?: any;
  setMarkerPosition?: any;
  mapRef?: any;
  markerRef?: any;
  handleMapClick?: any;
  formSubmitted?: boolean;
  domains?: any;
  specialHandlers?: Record<string, (e: any) => void>;
}

export const FormRenderer = <TFormData extends Record<string, any>>({
  fields,
  formData,
  errors,
  setErrors,
  handleChange,
  refs,
  setFormData,
  countries,
  specialHandlers,
}: FormRendererProps<TFormData>) => {
  const groupedFields = fields.reduce((acc, field) => {
    if (field.groupId) {
      acc[field.groupId] = acc[field.groupId] || [];
      acc[field.groupId].push(field);
    } else {
      acc["__ungrouped__"] = acc["__ungrouped__"] || [];
      acc["__ungrouped__"].push(field);
    }
    return acc;
  }, {} as Record<string, FieldConfig[]>);

  return (
    <>
      {Object.entries(groupedFields).map(([key, groupFields], idx) => {
        const isGrouped = key !== "__ungrouped__";

        return (
          <div
            key={idx}
            className={
              isGrouped
                ? "grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 m-0"
                : ""
            }
          >
            {groupFields.map((field, idx) => {
              switch (field.component) {
                case "PhoneInput":
                  if (!countries || !setFormData) return null;
                  return (
                    <PhoneInput
                      key={idx}
                      companyContact={formData.companyContact}
                      phoneNumber={formData.phoneNumber}
                      countries={countries}
                      onCompanyContactChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyContact: value,
                        }))
                      }
                      onPhoneNumberChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          phoneNumber: e.target.value,
                        }))
                      }
                      errors={{
                        companyContact: errors.companyContact,
                        phoneNumber: errors.phoneNumber,
                      }}
                      setErrors={setErrors}
                    />
                  );

                case "Input":
                  return (
                    <React.Fragment key={idx}>
                      <Input
                        label={
                          typeof field.label === "string" ? field.label : ""
                        }
                        type={field.type || "text"}
                        name={field.name!}
                        value={formData[field.name!]}
                        placeholder={field.placeholder ?? ""}
                        onChange={handleChange}
                        onBlur={
                          field.onBlur
                            ? specialHandlers?.[field.onBlur]
                            : undefined
                        }
                        errors={{ [field.name!]: errors[field.name!] }}
                        setErrors={setErrors}
                        ref={refs?.[field.refName || ""]}
                      />
                    </React.Fragment>
                  );
                case "CompanyNameSearch":
                  if (!setFormData) return null;
                  return (
                    <CompanyNameSearch
                      key={idx}
                      name={field.name!}
                      value={formData[field.name!]}
                      onChange={handleChange}
                      setFormData={setFormData as React.Dispatch<any>}
                      errors={errors[field.name!]}
                       setErrors={setErrors}
                    />
                  );

                case "Checkbox":
                  return (
                    <Checkbox
                      key={idx}
                      name={field.name!}
                      checked={!!formData[field.name!]}
                      onChange={handleChange}
                      label={field.label}
                      errors={errors}
                    />
                  );

                default:
                  return null;
              }
            })}
          </div>
        );
      })}
    </>
  );
};
