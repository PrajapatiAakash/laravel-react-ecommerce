<?php

namespace App\Admin\Traits;

trait FileUploadTrait
{
    /**
     * This function is used for save the file
     * @param object $file
     * @param string $folderPath
     */
    public function fileUpload($file, $folderPath)
    {
        // Get the original filename without extension
        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        // Generate a unique identifier
        $uniqueId = uniqid();

        // Get the original file extension
        $extension = $file->getClientOriginalExtension();

        // Combine the original filename, unique identifier, and extension
        $filename = $filename . '_' . $uniqueId . '.' . $extension;

        // Store the file in the storage/app/public directory with the modified filename
        return $file->storeAs($folderPath, $filename);
    }
}
