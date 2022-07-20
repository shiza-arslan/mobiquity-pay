export interface WebConfig {
  payload: {
    profileName: string;
    schema: [
      {
        label: string;
        name: string;
        sections: [
          {
            label: string;
            name: string;
            fields: [
              {
                label: string;
                type: string;
                inputType: string;
                allowedValuesPattern: string;
                apiGroup: string;
                apiGroupType: string;
                apiSection: string;
                apiSectionType: string;
                isUnique: string;
                isIdentifier: string;
                IsVerificationRequired: string;
                id: number;
                name: string;
                validations: [
                  {
                    name: string;
                    validator: string;
                    message: string;
                  },
                  {
                    name: string;
                    validator: string;
                    message: string;
                  },
                ];
                values: string;
              },
            ];
          },
        ];
      },
    ];
  };
}
