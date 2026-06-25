import { getStoreSettings } from "@/lib/actions/store";
import StoreSettingsForm from "@/components/settings/StoreSettingsForm";

export default async function SettingsPage() {
  const settings =
    await getStoreSettings();

  return (
    <div>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Store Settings
        </h1>

        <p className="text-gray-700 mb-8">
          Configure your bookstore
        </p>

        <StoreSettingsForm
          settings={settings}
        />

      </div>
    </div>
  );
}